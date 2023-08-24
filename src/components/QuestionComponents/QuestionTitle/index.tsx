/**
 * @description 问卷 - 输入框
 */
import Component from './QuestionTitle'
import { QuestionTitleDefaultProps } from './interface'
export * from './interface'

// title组件的配置
export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
