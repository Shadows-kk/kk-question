import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input
const ListSearch: React.FC = () => {
  const enterButton = <SearchOutlined />
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [serchValue, setSearchValue] = useState('')

  // 监听输入改变
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
  // 搜索查询 旨在改变url。与内容区没有其他数据流通，实现解藕
  const onSearch = (value: string) => {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  // 监听url 输入框回显内容
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const val = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setSearchValue(val)
  }, [searchParams])
  return (
    <Search
      allowClear
      placeholder="请输入关键词"
      value={serchValue}
      onChange={onChange}
      onSearch={onSearch}
      style={{ width: 200, marginBottom: '14px' }}
      enterButton={enterButton}
    ></Search>
  )
}
export default ListSearch
