import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Space, Tag, Divider, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import { updateQuestionService, duplicateQuestionService } from '../service/question'
import { useRequest } from 'ahooks'

const { confirm } = Modal
type propsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}
const QuestionCard: FC<propsType> = props => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props
  const [isStarStatus, setStarStatus] = useState(isStar)
  const { loading: isStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarStatus })
    },
    {
      manual: true,
      onSuccess() {
        setStarStatus(!isStarStatus)
      },
    }
  )
  const nav = useNavigate()
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => duplicateQuestionService(_id),
    {
      manual: true,
      onSuccess(res) {
        message.success('复制成功')
        nav(`/question/edit/${res.id}`)
      },
    }
  )
  const [deletedFlag, setDeletedFlag] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess(res) {
        message.success('删除成功')
        setDeletedFlag(true)
      },
    }
  )
  const del = () => {
    confirm({
      title: '确定要删除此问卷吗？',
      icon: <ExclamationCircleFilled />,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteQuestion()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  //已经删除的卡片 不渲染
  if (deletedFlag) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/statistic/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarStatus && <StarOutlined style={{ color: 'orange' }}></StarOutlined>}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['bottom-container']}>
        <div className={styles.left}>
          <Space>
            <Button type="text" size="small" icon={<EditOutlined />}>
              编辑问卷
            </Button>
            <Button type="text" size="small" icon={<LineChartOutlined />} disabled={!isPublished}>
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={isStarStatus ? <StarFilled style={{ color: 'orange' }} /> : <StarOutlined />}
              onClick={changeStar}
              disabled={isStarLoading}
            >
              {isStarStatus ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              placement="top"
              title="确定要复制问卷吗"
              onConfirm={duplicate}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
