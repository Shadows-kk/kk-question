import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './QuestionInfo'

test('默认属性', () => {
  render(<Component />) //渲染组件
  const h = screen.getByText('问卷标题')
  expect(h).toBeInTheDocument() //断言，根据文本获取的元素在渲染的组件中
})
test('传入属性', () => {
  render(<Component title="测试问卷标题" desc="测试问卷描述" />)
  const h = screen.getByText('测试问卷标题')
  expect(h).toBeInTheDocument()
  const p = screen.getByText('测试问卷描述')
  expect(p).toBeInTheDocument()
})
test('传入属性换行', () => {
  render(<Component desc={'a\nb\nc'} />)
  const p = screen.getByText('a')
  expect(p).toBeInTheDocument()
  expect(p).toHaveTextContent('a')
  expect(p).not.toHaveTextContent('ab') //被换行
})
