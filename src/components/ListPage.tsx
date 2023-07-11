import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE } from '../constant'

type PropType = {
  total: number
}
const ListPage: React.FC<PropType> = (props: PropType) => {
  const { total } = props
  const [currentPage, setcurrentPage] = useState(10)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  // 从url中拿到参数 并同步到组件中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setcurrentPage(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])

  // 当pagesize改变时，跳转页面（改变url参数）
  const nav = useNavigate()
  const { pathname } = useLocation()
  const handleOnChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={total}
      onChange={handleOnChange}
    ></Pagination>
  )
}
export default ListPage
