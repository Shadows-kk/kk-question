import Component from './QuestionRadio'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'
export * from './interface'
export default {
  title: '单选框',
  type: 'questionRadio',
  Component, //画布显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionRadioDefaultProps,
}
