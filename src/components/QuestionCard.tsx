import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import classnames from 'classnames'

type propsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  deleteQuestion?: (_id: string) => void
  publishQuestion?: (_id: string) => void
}
const QuestionCard: FC<propsType> = props => {
  const { _id, title, isPublished, deleteQuestion, publishQuestion } = props

  function editQuestion(_id: string) {
    console.log('edit', _id)
  }
  function del(_id: string) {
    deleteQuestion && deleteQuestion(_id)
  }
  function publish(_id: string) {
    publishQuestion && publishQuestion(_id)
  }
  const itemStyle = styles['item-style']
  const published = styles.published
  const itemClassName = classnames({
    [itemStyle]: true,
    [published]: isPublished,
  })
  return (
    <div className={itemClassName}>
      <strong>{title}</strong>
      &nbsp;
      {isPublished ? (
        <span className={styles['published-span']}>已发布</span>
      ) : (
        <span style={{ color: 'red' }}>未发布</span>
      )}
      &nbsp;
      <button
        onClick={() => {
          editQuestion(_id)
        }}
      >
        编辑问卷
      </button>
      <button
        onClick={() => {
          del(_id)
        }}
      >
        删除问卷
      </button>
      <button
        onClick={() => {
          publish(_id)
        }}
      >
        发布问卷
      </button>
    </div>
  )
}
export default QuestionCard
