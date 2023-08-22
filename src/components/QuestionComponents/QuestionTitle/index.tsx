/**
 * @description 问卷 - 输入框
 */
import Component from './QuestionTitle'
import { QuestionTitleDefaultProps } from './interface'
export * from './interface'

export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
