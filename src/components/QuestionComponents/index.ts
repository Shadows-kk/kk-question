import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, {
  QuestionRadioPropsType,
  QuestionRadioStatisticProps,
} from './QuestionRadio'
import QuestionCheckBoxConf, {
  QuestionCheckBoxPropsType,
  QuestionCheckBoxStatisticProps,
} from './QuestionCheckBox'
// 各个组件统一的 prop type
export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckBoxPropsType
// 各个组件统一的stat配置
type componentStatisticPropsType = QuestionRadioStatisticProps & QuestionCheckBoxStatisticProps
// 各个组件统一的配置类型
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  StatisticComponent?: FC<componentStatisticPropsType>
}

// 所有组件的配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInfoConf,
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckBoxConf,
]
// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'selectGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckBoxConf],
  },
]

// 根据类型返回组件的配置
export function getComponentConfByType(type: string) {
  const cpn = componentConfList.find(c => {
    return c.type === type
  })
  return cpn
}
