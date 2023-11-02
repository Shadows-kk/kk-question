import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './QuestionParagraph'

test('默认属性', () => {
  render(<Component />) //渲染组件
  const h = screen.getByText('一行段落')
  expect(h).toBeInTheDocument() //断言，根据文本获取的元素在渲染的组件中
})
test('测试用例', () => {
  render(<Component text="测试用例" isCenter={true} />) //渲染组件
  const h = screen.getByText('测试用例')
  expect(h).toBeInTheDocument() //断言，根据文本获取的元素在渲染的组件中
  const p = h.parentElement //父元素
  expect(p).not.toBeNull()
  const style = p!.style || {}
  expect(style.textAlign).toBe('center')
})
test('多行文字', () => {
  render(<Component text={'a\nb\nc'} />)
  const p = screen.getByText('a')
  expect(p).toBeInTheDocument()
  expect(p).toHaveTextContent('a')
  expect(p).not.toHaveTextContent('ab') //被换行
})
