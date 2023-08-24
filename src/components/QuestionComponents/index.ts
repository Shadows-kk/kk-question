import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

// 各个组件统一的 prop type
export type ComponentPropsType = QuestionTitlePropsType & QuestionInputPropsType
// 各个组件统一的配置类型
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 所有组件的配置列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

// 根据类型返回组件的配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}