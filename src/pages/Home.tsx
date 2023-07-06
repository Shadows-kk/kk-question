import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import styles from './Home.module.scss'
import { MANAGE_INDEX_PATHNAME } from '../router'
import { watch } from 'fs'
import axios from 'axios'
const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()
  useEffect(() => {
    axios.get('/api/test').then(res => console.log(res))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 ｜ 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 80 份，收到答卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Home
