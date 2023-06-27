import React, { FC, useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import styles from './List.module.scss'
import { produce } from 'immer'

const rowQuestionList = [
  {
    id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    creatAt: '6月27日',
  },
  {
    id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    creatAt: '6月27日',
  },
  {
    id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    creatAt: '6月27日',
  },
  {
    id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    creatAt: '6月27日',
  },
]

const List2: FC = () => {
  // 问卷列表数
  const [questionList, setQuestionList] = useState(rowQuestionList)
  const add = () => {
    const r = Math.random().toString().slice(2, 5)

    setQuestionList(
      produce(draft => {
        // draft.push({
        //   id: 'q' + r,
        //   title: '问卷' + r,
        //   isPublished: false,
        // })
      })
    )
  }
  const deleteQuestion = (id: string) => {
    setQuestionList(
      produce(draft => {
        const index = draft.findIndex(item => {
          return item.id === id
        })
        draft.splice(index, 1)
      })
    )
  }
  const publishQuestion = (id: string) => {
    setQuestionList(
      // questionList.map(item => {
      //   if (item.id !== id) retur n item
      //   return {
      //     ...item,
      //     isPublished: true,
      //   }
      // })
      produce(draft => {
        const q = draft.find(item => item.id === id)
        if (q) q.isPublished = true
      })
    )
  }

  return (
    <div className="App">
      <h1>问卷列表</h1>
      <div>
        {questionList.map(item => {
          const { id, title, isPublished } = item
          return (
            <QuestionCard
              key={id}
              id={id}
              title={title}
              isPublished={isPublished}
              deleteQuestion={deleteQuestion}
              publishQuestion={publishQuestion}
            ></QuestionCard>
          )
        })}
      </div>
      <button onClick={add}>新增</button>
    </div>
  )
}
export default List2
