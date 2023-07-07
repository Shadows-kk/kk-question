import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../../../service/question'

const Home: FC = () => {
  const { id = '' } = useParams()
  useEffect(() => {
    const fn = async () => {
      const res = await getQuestionService(id)
      console.log(res)
    }
    fn() // useEffect中无法直接执行async函数
  }, [])
  return (
    <>
      <div>home</div>
    </>
  )
}
export default Home
