import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
const Statistic: FC = () => {
  const { loading } = useLoadQuestionData()

  return (
    <>
      <div>Statistic</div>
      {loading ? <p>加载中</p> : <p></p>}
    </>
  )
}
export default Statistic
