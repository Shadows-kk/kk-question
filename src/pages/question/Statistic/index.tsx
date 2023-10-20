import React, { FC } from 'react'
import { Spin, Result, Button } from 'antd'
import { useTitle } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import style from './index.module.scss'
import StatisHeader from './StatisHeader'
import ComponentList from './ComponentList'
import PageStatistic from './PageStatistic'
import ChartStatistic from './ChartStatistic'
const Statistic: FC = () => {
  const nav = useNavigate()

  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()

  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = React.useState('')
  const [selectedComponentType, setSelectedComponentType] = React.useState('')
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
        <div className={style.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></ComponentList>
        </div>
        <div className={style.main}>
          <PageStatistic
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={style.right}>
          <ChartStatistic
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
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
