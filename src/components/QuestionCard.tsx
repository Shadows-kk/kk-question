import React, { FC } from 'react'
import './QuestionCard.css'

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
  return (
    <div className="item-style">
      <strong>{title}</strong>
      &nbsp;
      {isPublished ? (
        <span style={{ color: 'green' }}>已发布</span>
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
