import React from 'react'
import { Space, Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copyComponent,
  pasteComponent,
} from '../../../store/componentsReducer'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
const EditToolbar: React.FC = () => {
  const dispatch = useDispatch()
  const { selectedID, selectedComponent, copiedComponent } = useGetComponentInfo()
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
  // 复制组件
  const handleCopy = () => {
    dispatch(copyComponent())
  }
  // 粘贴组件
  const handlePaste = () => {
    if (!copiedComponent) return
    dispatch(pasteComponent())
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
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          disabled={copiedComponent == null}
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
        ></Button>
      </Tooltip>
    </Space>
  )
}
export default EditToolbar
