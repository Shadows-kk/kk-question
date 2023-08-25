import React from 'react'
import { Spin } from 'antd'
import style from './EditCanvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType } from '../../../store/componentsReducer'
type PropsType = {
  loading: boolean
}
// 获取组件
function getComponent(component: ComponentInfoType) {
  const { type, props } = component
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props}></Component>
}
const EditCanvas: React.FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    )
  }
  return (
    <div className={style.canvas}>
      {componentList.map(c => {
        const { fe_id } = c
        return (
          <div key={fe_id} className={style['component-wrapper']}>
            <div className={style.component}>{getComponent(c)}</div>
          </div>
        )
      })}
      {/* <div className={style['component-wrapper']}>
        <div className={style.component}>
          <QuestionTitle level={2} text={'一级标题'} isCenter></QuestionTitle>
        </div>
      </div>
      <div className={style['component-wrapper']}>
        <div className={style.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div> */}
    </div>
  )
}
export default EditCanvas
