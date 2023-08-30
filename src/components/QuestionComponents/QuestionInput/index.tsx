/**
 * @description 问卷 - 标题
 */
import Component from './QuestionInput'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'
export * from './interface'

// input组件的配置
export default {
  title: '标题',
  type: 'questionInput',
  Component, //画布显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionInputDefaultProps,
}
