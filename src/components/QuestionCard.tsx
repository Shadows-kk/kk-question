import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import classnames from 'classnames'

type propsType = {
  id: string
  title: string
  isPublished: boolean
  deleteQuestion?: (id: string) => void
  publishQuestion?: (id: string) => void
}
const QuestionCard: FC<propsType> = props => {
  const { id, title, isPublished, deleteQuestion, publishQuestion } = props

  function editQuestion(id: string) {
    console.log('edit', id)
  }
  function del(id: string) {
    deleteQuestion && deleteQuestion(id)
  }
  function publish(id: string) {
    publishQuestion && publishQuestion(id)
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
          editQuestion(id)
        }}
      >
        编辑问卷
      </button>
      <button
        onClick={() => {
          del(id)
        }}
      >
        删除问卷
      </button>
      <button
        onClick={() => {
          publish(id)
        }}
      >
        发布问卷
      </button>
    </div>
  )
}
export default QuestionCard
