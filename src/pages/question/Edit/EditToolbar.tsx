import React from 'react'
import { Space, Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
} from '../../../store/componentsReducer'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
const EditToolbar: React.FC = () => {
  const dispatch = useDispatch()
  const { selectedID, selectedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  // 删除组件
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }
  // 隐藏组件
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedID, isHidden: true }))
  }
  // 锁定组件
  const handleLock = () => {
    dispatch(toggleComponentLock({ fe_id: selectedID }))
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
    </Space>
  )
}
export default EditToolbar
