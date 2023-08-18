import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import getUserInfo from '../hooks/useGetUserInfo'

const { Title } = Typography
const Logo: React.FC = () => {
  const { username } = getUserInfo()
  const [pathname, setPathname] = useState(HOME_PATHNAME)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])
  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>kk问卷</Title>
        </Space>
      </Link>
    </div>
  )
}
export default Logo
