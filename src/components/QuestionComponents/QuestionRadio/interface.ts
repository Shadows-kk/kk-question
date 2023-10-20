export type OptionType = {
  value: string
  text: string
}
export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string

  // 用于PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}
export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
  value: '',
}

//统计组件props
export type QuestionRadioStatisticProps = {
  stat: Array<{ name: string; value: number }>
}
