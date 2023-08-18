import React from 'react'
import styles from './UserInfo.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
// import { getUserInfoService } from '../service/user'
// import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { removeToken } from '../utils/user-token'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'
import getUserInfo from '../hooks/useGetUserInfo'

const UserInfo: React.FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}
  const { username, nickname } = getUserInfo()
  const logout = () => {
    dispatch(logoutReducer()) //清空redux中user的数据
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
  return <div>{username ? UserInfo : Login}</div>
}
export default UserInfo
