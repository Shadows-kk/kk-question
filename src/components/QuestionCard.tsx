import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import { Link } from 'react-router-dom'
import { Button, Space, Tag, Divider, Popconfirm, Modal } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons'

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
  const duplicate = () => {
    alert('copy')
  }
  const del = () => {
    confirm({
      title: '注意',
      content: '确定要删除此问卷吗？',
      icon: <ExclamationCircleFilled />,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/statistic/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'orange' }}></StarOutlined>}
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
              icon={isStar ? <StarFilled style={{ color: 'orange' }} /> : <StarOutlined />}
            >
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              placement="top"
              title="确定要复制问卷吗"
              onConfirm={duplicate}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" size="small" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>

            <Button type="text" size="small" icon={<DeleteOutlined />} onClick={del}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
