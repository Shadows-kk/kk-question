import React, { FC, useState } from 'react'
import QuestionCard from './components/QuestionCard'
import { produce } from 'immer'
const List2: FC = () => {
  // 问卷列表数
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: false },
    { id: 'q3', title: '问卷3', isPublished: true },
    { id: 'q4', title: '问卷4', isPublished: true },
  ])
  const add = () => {
    const r = Math.random().toString().slice(2, 5)

    setQuestionList(
      produce(draft => {
        draft.push({
          id: 'q' + r,
          title: '问卷' + r,
          isPublished: false,
        })
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
      //   if (item.id !== id) return item
      //   return {
      //     ...item,
      //     isPublished: true,
      //   }
      // })
      produce(draft => {
        draft.forEach(item => {
          if (item.id === id) item.isPublished = true
        })
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
