import Component from './QuestionCheckBox'
import PropComponent from './PropComponent'
import { QuestionCheckBoxDefaultProps } from './interface'
export * from './interface'

export default {
  title: '多选框',
  type: 'questionCheckBox',
  Component, //画布显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionCheckBoxDefaultProps,
}
