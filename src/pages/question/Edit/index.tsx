import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { changeSelectedId } from '../../../store/componentsReducer'

import style from './index.module.scss'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  const clearSelectedId = () => {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>返回</div>
        <div>工具栏</div>
        <div>操作</div>
      </div>
      <div className={style.main}>
        <div className={style.left}>
          <LeftPanel></LeftPanel>
        </div>
        <div className={style.center} onClick={clearSelectedId}>
          <div className={style['canvas-container']}>
            <EditCanvas loading={loading}></EditCanvas>
          </div>
        </div>
        <div className={style.right}>
          <RightPanel></RightPanel>
        </div>
      </div>
    </div>
  )
}
export default Edit
