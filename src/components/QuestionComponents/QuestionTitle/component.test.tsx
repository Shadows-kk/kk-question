import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './QuestionTitle'

test('默认属性', () => {
  render(<Component />) //渲染组件
  const h = screen.getByText('默认标题')
  expect(h).toBeInTheDocument() //断言，根据文本获取的元素在渲染的组件中
})
test('测试用例', () => {
  render(<Component text="测试标题" level={2} isCenter={true} />) //渲染组件
  const h = screen.getByText('测试标题')
  expect(h).toBeInTheDocument()
  expect(h.matches('h2')).toBeTruthy() //<h2>
  const style = h.style
  expect(style.textAlign).toBe('center')
})
