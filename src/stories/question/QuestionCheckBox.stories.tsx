import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionCheckBox/QuestionCheckBox'
const meta = {
  title: 'Question/QuestionCheckBox',
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
    title: '多选标题',
    isVertical: false,
    list: [
      { value: 'item1', text: '选项1', checked: true },
      { value: 'item2', text: '选项2', checked: false },
      { value: 'item3', text: '选项3', checked: true },
    ],
  },
}
