import React from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionParagraph: React.FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  const textList = text.split('\n')
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
      {textList.map((item, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {item}
        </span>
      ))}
    </Paragraph>
  )
}
export default QuestionParagraph
