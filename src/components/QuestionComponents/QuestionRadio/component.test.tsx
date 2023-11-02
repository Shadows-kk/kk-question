import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './QuestionRadio'

test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('单选标题')
  expect(h).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
  }
})
test('测试用例', () => {
  const opts = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ]
  const value = 'v1'
  render(<Component title="测试用例标题" options={opts} value={value} />)
  const h = screen.getByText('测试用例标题')
  expect(h).toBeInTheDocument()
  for (let i = 1; i <= 3; i++) {
    const currentVal = `v${i}`
    const radio = screen.getByDisplayValue(currentVal)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`t${i}`)
    expect(label).toBeInTheDocument()
    // 选中状态
    if (value === currentVal) {
      expect(radio.getAttribute('checked')).not.toBeNull()
    }
  }
})
