import React, { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { useTitle } from 'ahooks'
import { Typography } from 'antd'

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
  return (
    <>
      <div>Star</div>
    </>
  )
}
export default Star
