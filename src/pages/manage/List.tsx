import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Spin } from 'antd'
import useLoadQuetionListData from '../../hooks/useLoadQuetionListData'

const { Title } = Typography

const List: FC = () => {
  useTitle('kk问卷-我的问卷')
  // 问卷列表数
  const { loading, data = {} } = useLoadQuetionListData()
  const { list = [], total = 0 } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.center}>
        {/* 问卷列表 */}
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item}></QuestionCard>
          })}
      </div>
      <div className={styles.bottom}>loaderMore...上滑加载更多</div>
    </>
  )
}
export default List
