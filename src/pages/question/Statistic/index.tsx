import React, { FC } from 'react'
import { Spin, Result, Button } from 'antd'
import { useTitle } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import style from './index.module.scss'
import StatisHeader from './StatisHeader'
const Statistic: FC = () => {
  const nav = useNavigate()

  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()
  // 修改标题
  useTitle(`问卷统计 - ${title}`)
  const loadingEle = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>{loading ? <Spin /> : <p>a</p>}</div>
  )
  const getContent = () => {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <Result
          status="warning"
          title="该页面尚未发布"
          extra={
            <Button type="primary" onClick={() => nav(-1)}>
              返回
            </Button>
          }
        ></Result>
      )
    }
    return (
      <>
        <div className={style.left}>zuo</div>
        <div className={style.main}>center</div>
        <div className={style.right}>right</div>
      </>
    )
  }

  return (
    <div className={style.container}>
      <StatisHeader></StatisHeader>
      <div className={style['content-wrapper']}>
        {loading && loadingEle}
        {!loading && <div className={style.content}>{getContent()}</div>}
      </div>
    </div>
  )
}
export default Statistic
