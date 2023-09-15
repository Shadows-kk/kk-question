import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input } from 'antd'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { resetPageInfo } from '@/store/pageInfoReducer'

const { TextArea } = Input
const PageSetting: React.FC = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  const { title = '', desc = '', js = '', css = '' } = pageInfo
  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [pageInfo])
  const handleValuesChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入问卷标题"></Input>
      </Form.Item>
      <Form.Item label="页面描述" name="desc">
        <TextArea placeholder="请输入问卷描述..."></TextArea>
      </Form.Item>
      <Form.Item label="json" name="js">
        <TextArea placeholder="请输入脚本代码..."></TextArea>
      </Form.Item>
      <Form.Item label="css" name="css">
        <TextArea placeholder="请输入css代码..."></TextArea>
      </Form.Item>
    </Form>
  )
}
export default PageSetting
