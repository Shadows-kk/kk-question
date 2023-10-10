import React from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentProp } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '../../../components/QuestionComponents'

const NoProp: React.FC = () => {
  return <div>未选中组件</div>
}

const ComponentProp: React.FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProp />
  // 根据 选择的组件 选择类型
  const { type, props, isLocked, isHidden } = selectedComponent
  // 根据 类型 找到配置
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  const changeProps = (newProps: ComponentPropsType) => {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProp({ fe_id, newProps }))
  }
  // 根据配置找到属性组件
  const { PropComponent } = componentConf

  return (
    <>
      <PropComponent
        {...props}
        onChange={changeProps}
        disabled={isLocked || isHidden}
      ></PropComponent>
    </>
  )
}
export default ComponentProp
