import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'

const { Title } = Typography
const rowQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: '6月27日',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '6月27日',
  },
]

const Star: FC = () => {
  useTitle('kk问卷-星标问卷')
  // 问卷列表数
  const [questionList, setQuestionList] = useState(rowQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.center}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty />}
        {questionList.length > 0 &&
          questionList.map(item => {
            const { _id } = item
            return <QuestionCard key={_id} {...item}></QuestionCard>
          })}
      </div>
      <div className={styles.bottom}>分页</div>
    </>
  )
}
export default Star
