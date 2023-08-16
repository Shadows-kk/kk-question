import React, { FC, useEffect } from 'react'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import { userLoginService } from '../service/user'
import { useRequest } from 'ahooks'
import { setToken } from '../utils/user-token'

const { Title } = Typography
const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'
const remberForm = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
const removeForm = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
const getFormByLocal = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}
const Register: FC = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getFormByLocal()
    form.setFieldsValue({ username, password })
  }, [])
  const { run } = useRequest(
    async (username: string, password: string) => {
      const res = await userLoginService(username, password)
      return res
    },
    {
      manual: true,
      onSuccess(res) {
        const { token = '' } = res
        setToken(token)
        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )
  const onFinish = (values: any) => {
    const { username, password, remember } = values
    run(username, password)

    if (remember) {
      remberForm(username, password)
    } else {
      removeForm()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title>
            <UserOutlined></UserOutlined>
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { type: 'string', min: 5, max: 20, message: '长度必须在5-20位之间！' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线！' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Register
