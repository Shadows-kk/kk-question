import Component from './QuestionParagraph'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'
export * from './interface'

// input组件的配置
export default {
  title: '段落',
  type: 'questionParagraph',
  Component, //画布显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionParagraphDefaultProps,
}
