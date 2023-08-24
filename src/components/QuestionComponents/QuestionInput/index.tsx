/**
 * @description 问卷 - 标题
 */
import Component from './QuestionInput'
import { QuestionInputDefaultProps } from './interface'
export * from './interface'

// input组件的配置
export default {
  title: '标题',
  type: 'questionInput',
  Component,
  defaultProps: QuestionInputDefaultProps,
}
