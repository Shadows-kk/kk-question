import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './EditHeader.module.scss'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
const EditHeader: React.FC = () => {
  const nav = useNavigate()
  const { Title } = Typography
  return (
    <div className={style['header-wrapper']}>
      <div className={style['header']}>
        <div className={style['left']}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={style['center']}>center</div>
        <div className={style['right']}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default EditHeader
