import React, { useEffect } from 'react'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { OptionType, QuestionCheckBoxPropsType } from './interface'
import { nanoid } from '@reduxjs/toolkit'
const PropComponent: React.FC<QuestionCheckBoxPropsType> = (props: QuestionCheckBoxPropsType) => {
  const { title, isVertical, list, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])
  const handleChange = () => {
    if (onChange == null) return
    const newValues = form.getFieldsValue() as QuestionCheckBoxPropsType
    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null))
    }
    const { list = [] } = newValues
    list.forEach((opt: OptionType) => {
      if (opt.value) return
      opt.value = nanoid(5)
    })
    onChange(newValues)
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题1"
        name="title"
        rules={[{ required: true, message: '标题内容不能为空' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => {
            return (
              <>
                {/* 遍历所有选项，可删除 */}
                {fields.map(({ key, name }, index) => {
                  return (
                    <Space key={key} align="baseline">
                      {/* 当前选项是否选中 */}
                      <Form.Item name={[name, 'checked']} valuePropName="checked">
                        <Checkbox />
                      </Form.Item>
                      {/* 当前选项输入框 */}
                      <Form.Item
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: '请输入选项文字' },
                          {
                            validator: (_, text) => {
                              const { list = [] } = form.getFieldsValue()
                              let num = 0
                              list.forEach((opt: OptionType) => {
                                // 记录text相同的个数，预期只有自己（1个）
                                if (opt.text === text) num++
                              })
                              if (num === 1) return Promise.resolve()
                              return Promise.reject('添加项不能重复')
                            },
                          },
                        ]}
                      >
                        <Input></Input>
                      </Form.Item>
                      {/* 删除按钮 */}
                      {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </Space>
                  )
                })}
                {/* 添加选项 */}
                <Form.Item>
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    block
                    onClick={() => add({ text: '', value: '', checked: false })}
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>纵向展示</Checkbox>
      </Form.Item>
    </Form>
  )
}
export default PropComponent
