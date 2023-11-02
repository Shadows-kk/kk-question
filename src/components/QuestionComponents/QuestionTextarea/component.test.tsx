import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './QuestionTextarea'

test('默认属性', () => {
  render(<Component />) //渲染组件
  const h = screen.getByText('输入框标题')
  expect(h).toBeInTheDocument() //断言，根据文本获取的元素在渲染的组件中
  const p = screen.getByPlaceholderText('请输入...')
  expect(p).toBeInTheDocument()
})
test('测试用例', () => {
  render(<Component title="测试用例输入框标题" placeholder="测试用例请输入..." />) //渲染组件
  const h = screen.getByText('测试用例输入框标题')
  expect(h).toBeInTheDocument() //断言，根据文本获取的元素在渲染的组件中
  const p = screen.getByPlaceholderText('测试用例请输入...')
  expect(p).toBeInTheDocument()
})
