import React from 'react'
import styles from './UserInfo.module.scss'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

const UserInfo: React.FC = () => {
  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )
}
export default UserInfo
