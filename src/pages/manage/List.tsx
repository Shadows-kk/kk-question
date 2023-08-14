import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { getQuestionList } from '../../service/question'
import { Typography, Spin, Empty } from 'antd'
import useLoadQuetionListData from '../../hooks/useLoadQuetionListData'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('kk问卷-我的问卷')

  const [started, setStarted] = useState(false) //标记是否开始（防抖，有延迟时间）
  const [list, setList] = useState([]) // 问卷列表数
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  // keyword变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setList([])
    setPage(1)
    setTotal(0)
  }, [keyword])
  const { run: load, loading } = useRequest(
    async () => {
      const data = getQuestionList({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  // 尝试触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const ele = containerRef.current
      if (ele == null) return
      const domRect = ele.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )
  // 1.当页面加载，或者url参数变化时，触发
  useEffect(() => {
    tryLoadMore() //加载首屏数据
  }, [searchParams])
  // 2.页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore) //需要防抖
    }
    return () => {
      //组件销毁或者searchParams变化前销毁事件
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])
  const loadMoreContentEle = useMemo(() => {
    if (!started || loading) return <Spin></Spin>
    if (total == 0) return <Empty description="暂无数据"></Empty>
    if (!haveMoreData) return <span>一滴都不剩了...</span>
    return <span>开始加载下一页...</span>
  }, [started, loading, haveMoreData])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.center}>
        {/* 问卷列表 */}

        {list.length > 0 &&
          list.map((item: any) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item}></QuestionCard>
          })}
      </div>
      <div className={styles.bottom}>
        <div ref={containerRef}>{loadMoreContentEle}</div>
      </div>
    </>
  )
}
export default List
