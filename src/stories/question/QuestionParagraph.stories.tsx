import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionParagraph/QuestionParagraph'
const meta = {
  title: 'Question/QuestionParagraph',
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

// 默认属性
export const Default: Story = {
  args: {},
}
// 设置属性
export const SetProps: Story = {
  args: {
    text: '一行段落',
    isCenter: false,
  },
}
