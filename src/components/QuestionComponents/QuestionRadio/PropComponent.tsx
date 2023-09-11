import React, { useEffect } from 'react'
import { Form, Input, Checkbox, Select } from 'antd'
import { QuestionRadioPropsType } from './interface'
const PropComponent: React.FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])
  const handleChange = () => {
    if (onChange == null) return
    onChange(form.getFieldsValue())
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onChange={handleChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '标题内容不能为空' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ value, text }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}
export default PropComponent
