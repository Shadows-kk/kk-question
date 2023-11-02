import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionTitle/QuestionTitle'

const meta = {
  title: 'Question/QuestionTitle',
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
    text: '默认标题',
    level: 1,
    isCenter: false,
  },
}
