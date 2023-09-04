import React from 'react'
import { Space, Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent, changeComponentHidden } from '../../../store/componentsReducer'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
const EditToolbar: React.FC = () => {
  const dispatch = useDispatch()
  const { selectedID: fe_id } = useGetComponentInfo()

  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id, isHidden: true }))
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
    </Space>
  )
}
export default EditToolbar
