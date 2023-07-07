import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './manageLayout.module.scss'
import { Space, Button, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '../service/question'
import { useRequest } from 'ahooks'

const manageLayout: React.FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { loading, run: createQuestion } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: (result, params) => {
      nav(`/question/edit/${result.id}`)
    },
  })
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={createQuestion}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            icon={<BarsOutlined />}
            onClick={() => nav('list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            icon={<StarOutlined />}
            onClick={() => nav('star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            onClick={() => nav('trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
export default manageLayout
