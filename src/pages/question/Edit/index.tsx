import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { changeSelectedId } from '../../../store/componentsReducer'

import style from './index.module.scss'
import EditHeader from './EditHeader'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title } = useGetPageInfo()
  useTitle(`修改问卷 - ${title}`)
  const dispatch = useDispatch()
  const clearSelectedId = () => {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={style.container}>
      <EditHeader></EditHeader>
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
