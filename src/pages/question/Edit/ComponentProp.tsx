import React from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'

const NoProp: React.FC = () => {
  return <div>未选中组件</div>
}
const ComponentProp: React.FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  console.log(selectedComponent)
  if (selectedComponent == null) return <NoProp />
  // 根据选择的组件选择类型
  const { type, props } = selectedComponent
  // 根据类型找到配置
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />
  // 根据配置找到属性组件
  const { PropComponent } = componentConf
  return <PropComponent {...props}></PropComponent>
}
export default ComponentProp
