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
// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

// 根据类型返回组件的配置
export function getComponentConfByType(type: string) {
  const cpn = componentConfList.find(c => {
    return c.type === type
  })
  return cpn
}
