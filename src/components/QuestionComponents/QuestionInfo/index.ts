import Component from './QuestionInfo'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'
export * from './interface'

// input组件的配置
export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component, //画布显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionInfoDefaultProps,
}
