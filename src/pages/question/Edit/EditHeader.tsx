import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { changePageTitle } from '@/store/pageInfoReducer'
import style from './EditHeader.module.scss'
import EditToolbar from './EditToolbar'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { updateQuestionService } from '@/service/question'

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
// 保存按钮
const SaveButton: React.FC = () => {
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )
  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })
  // 自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )
  return (
    <Button onClick={save} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}
// 发布按钮
const PublishButton: React.FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/statistic/' + id)
      },
    }
  )
  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      发布
    </Button>
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
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}
export default EditHeader
