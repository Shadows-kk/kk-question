import React, { FC, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'
import { produce } from 'immer'

const rowQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '6月27日',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '6月27日',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '6月27日',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '6月27日',
  },
]

const List: FC = () => {
  // 问卷列表数
  const [questionList, setQuestionList] = useState(rowQuestionList)
  const add = () => {
    const r = Math.random().toString().slice(2, 5)

    setQuestionList(
      produce(draft => {
        // draft.push({
        //   _id: 'q' + r,
        //   title: '问卷' + r,
        //   isPublished: false,
        // })
      })
    )
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.center}>
        <div>
          {questionList.map(item => {
            const { _id, title, isPublished, isStar, answerCount, createdAt } = item
            return <QuestionCard key={_id} {...item}></QuestionCard>
          })}
        </div>
        <button onClick={add}>新增</button>
      </div>
      <div className={styles.bottom}>底部</div>
    </>
  )
}
export default List
