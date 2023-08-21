import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import styles from './QuestionLayout.module.scss'
const QuestionLayout: FC = () => {
  // 加载用户信息
  const { waitingUserData } = useLoadUserData()
  // 用户没有登录时 跳转登录页面
  useNavPage(waitingUserData)
  return (
    <>
      <div className={styles.container}>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '10%' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}
export default QuestionLayout
