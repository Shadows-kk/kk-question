import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionRadio/QuestionRadio'

const meta = {
  title: 'Question/QuestionRadio',
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
    title: '单选标题',
    isVertical: false,
    options: [
      { value: 'item1', text: '选项1' },
      { value: 'item2', text: '选项2' },
      { value: 'item3', text: '选项3' },
    ],
    value: 'item2',
  },
}
