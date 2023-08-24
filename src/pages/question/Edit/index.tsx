import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import style from './index.module.scss'
import EditCanvas from './EditCanvas'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>返回</div>
        <div>工具栏</div>
        <div>操作</div>
      </div>
      <div className={style.main}>
        <div className={style.left}>left</div>
        <div className={style.center}>
          <div className={style['canvas-container']}>
            <EditCanvas loading={loading}></EditCanvas>
          </div>
        </div>
        <div className={style.right}>right</div>
      </div>
    </div>
  )
}
export default Edit
