// 属性组件，用来修改组件的属性
import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionTextareaPropsType } from './interface'
const PropComponent: React.FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])
  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="内容" name="placeholder">
        <Input></Input>
      </Form.Item>
    </Form>
  )
}
export default PropComponent
