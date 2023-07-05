import React, { FC, useEffect } from 'react'
import styles from './Login.module.scss'
import { Link } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME } from '../router'

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
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getFormByLocal()
    form.setFieldsValue({ username, password })
  }, [])
  const onFinish = (values: any) => {
    console.log(values)
    const { username, password, remember } = values
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
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
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
