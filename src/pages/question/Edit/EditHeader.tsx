import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Space, Form, Input } from 'antd'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '@/store/pageInfoReducer'
import style from './EditHeader.module.scss'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '@/hooks/useGetPageInfo'

const { Title } = Typography

// 显示及修改标题组件
const TitleElem: React.FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()

  const [editFlag, setEditFlag] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim()
    if (newValue) {
      dispatch(changePageTitle({ title: newValue }))
    }
  }
  if (editFlag) {
    return (
      <Input
        value={title}
        onPressEnter={() => {
          setEditFlag(false)
        }}
        onBlur={() => {
          setEditFlag(false)
        }}
        onChange={handleChange}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => {
          setEditFlag(true)
        }}
      ></Button>
    </Space>
  )
}
// 编辑器头部组件
const EditHeader: React.FC = () => {
  const nav = useNavigate()

  return (
    <div className={style['header-wrapper']}>
      <div className={style['header']}>
        <div className={style['left']}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={style['center']}>
          <EditToolbar></EditToolbar>
        </div>
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
