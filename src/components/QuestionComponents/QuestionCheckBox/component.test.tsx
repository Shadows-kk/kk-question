import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './QuestionCheckBox'

test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('多选标题')
  expect(h).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
    expect(radio.getAttribute('checked')).toBeNull()
  }
})
test('测试用例', () => {
  const opts = [
    { value: 'v1', text: 't1', checked: false },
    { value: 'v2', text: 't2', checked: true },
    { value: 'v3', text: 't3', checked: true },
  ]
  render(<Component title="测试用例标题" list={opts} />)
  const h = screen.getByText('测试用例标题')
  expect(h).toBeInTheDocument()

  const check1 = screen.getByDisplayValue('v1')
  expect(check1).toBeInTheDocument()
  expect(check1.getAttribute('checked')).toBeNull() //未选中

  const check2 = screen.getByDisplayValue('v2')
  expect(check2).toBeInTheDocument()
  expect(check2.getAttribute('checked')).not.toBeNull()
  const check3 = screen.getByDisplayValue('v3')
  expect(check3).toBeInTheDocument()
  expect(check3.getAttribute('checked')).not.toBeNull()
})
