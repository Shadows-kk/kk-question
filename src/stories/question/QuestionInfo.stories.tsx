import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Component from '../../components/QuestionComponents/QuestionInfo/QuestionInfo'

const meta = {
  title: 'Question/QuestionInfo',
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
    title: '测试用例问卷标题',
    desc: '测试用例问卷描述',
  },
}
// 换行
export const DescBreakLine: Story = {
  args: {
    title: '测试用例问卷标题',
    desc: 'a\nb\nc\n',
  },
}
