import React, { FC, useState } from 'react'
import ListSearch from '../../components/ListSearch'

import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Table, Empty, Tag, Button, Space, Modal, Spin } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import useLoadQuetionListData from '../../hooks/useLoadQuetionListData'

const { Title } = Typography
const { confirm } = Modal

const columns = [
  { title: '问卷', dataIndex: 'title', key: 'title' },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    key: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    },
  },
  { title: '答卷数', dataIndex: 'answerCount', key: 'answerCount' },
  { title: '创建日期', dataIndex: 'createdAt', key: 'createdAt' },
]

const Trash: FC = () => {
  useTitle('kk问卷-回收站')
  // 问卷列表数
  const { loading, data = {} } = useLoadQuetionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const rowSelection = {
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedIds(newSelectedRowKeys as string[])
    },
  }
  const del = () => {
    confirm({
      title: '确定要删除此问卷吗？',
      content: '此操作将永久删除数据',
      icon: <ExclamationCircleFilled />,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        alert(selectedIds)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  const tableEle = (
    <>
      <div style={{ marginBottom: '14px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        rowKey={q => q._id}
        columns={columns}
        dataSource={list}
        rowSelection={rowSelection}
        pagination={false}
      ></Table>
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.center}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && tableEle}
      </div>
      <div className={styles.bottom}>分页</div>
    </>
  )
}
export default Trash
