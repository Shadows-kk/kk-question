import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { HOME_PATHNAME } from '../router'

const { Title } = Typography
const Logo: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
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
