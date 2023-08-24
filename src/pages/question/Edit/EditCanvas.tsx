import React from 'react'
import { Spin } from 'antd'
import style from './EditCanvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

import QuestionInput from '../../../components/QuestionComponents/QuestionInput/QuestionInput'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/QuestionTitle'
type PropsType = {
  loading: boolean
}
const EditCanvas: React.FC<PropsType> = ({ loading }) => {
  const { components: componentList } = useGetComponentInfo()
  console.log(componentList)
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    )
  }
  return (
    <div className={style.canvas}>
      <div className={style['component-wrapper']}>
        <div className={style.component}>
          <QuestionTitle level={2} text={'一级标题'} isCenter></QuestionTitle>
        </div>
      </div>
      <div className={style['component-wrapper']}>
        <div className={style.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div>
    </div>
  )
}
export default EditCanvas
