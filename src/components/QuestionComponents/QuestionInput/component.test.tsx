import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './QuestionInput'

test('默认属性', () => {
  render(<Component />) //渲染组件
  const h = screen.getByText('输入框标题')
  expect(h).toBeInTheDocument() //断言，根据文本获取的元素在渲染的组件中
  const p = screen.getByPlaceholderText('请输入...')
  expect(p).toBeInTheDocument()
})
test('测试用例', () => {
  render(<Component title="测试输入框标题" placeholder="测试用例..." />) //渲染组件
  const h = screen.getByText('测试输入框标题')
  expect(h).toBeInTheDocument()
  const p = screen.getByPlaceholderText('测试用例...')
  expect(p).toBeInTheDocument()
})
