import React from 'react'
import { QuestionCheckBoxDefaultProps, QuestionCheckBoxPropsType } from './interface'
import { Typography, Space, Checkbox } from 'antd'

const { Paragraph } = Typography
const QuestionCheckBox: React.FC<QuestionCheckBoxPropsType> = (
  props: QuestionCheckBoxPropsType
) => {
  const { title, isVertical, list, onChange, disabled } = {
    ...QuestionCheckBoxDefaultProps,
    ...props,
  }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list?.map(item => {
          const { text, value, checked } = item
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}
export default QuestionCheckBox
