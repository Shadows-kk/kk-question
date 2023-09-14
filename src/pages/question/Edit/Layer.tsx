import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Input, message, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeSelectedId } from '../../../store/componentsReducer'
import {
  changeComponentTitle,
  changeComponentHidden,
  toggleComponentLock,
} from '../../../store/componentsReducer'
import style from './Layer.module.scss'
const Layer: React.FC = () => {
  const { componentList, selectedID } = useGetComponentInfo()
  const dispatch = useDispatch()
  // 当前修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')
  // 点击选中组件
  const handleTitleClick = (fe_id: string) => {
    const curComponent = componentList.find(i => i.fe_id === fe_id)
    if (curComponent && curComponent.isHidden) {
      message.info('不能选中隐藏组件')
      return
    }
    if (fe_id !== selectedID) {
      dispatch(changeSelectedId(fe_id))
      // 清空输入框 显示为文本
      setChangingTitleId('')
      return
    }
    // 选中后 再次点击 切换成输入框
    setChangingTitleId(fe_id)
  }
  // 输入框值改变
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (!newValue) return
    if (!selectedID) return
    dispatch(changeComponentTitle({ fe_id: selectedID, title: newValue }))
  }
  //切换隐藏/显示
  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(
      changeComponentHidden({
        fe_id,
        isHidden,
      })
    )
  }
  // 切换锁定/解锁
  const changeLock = (fe_id: string) => {
    dispatch(
      toggleComponentLock({
        fe_id,
      })
    )
  }
  return (
    <>
      {componentList.map(item => {
        const { fe_id, title, isHidden, isLocked } = item
        // 拼接title classname
        const titleDefaultClassName = style.title
        const selectedClassName = style.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedID,
        })
        return (
          <div key={fe_id} className={style.wrapper}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {fe_id === changingTitleId && (
                <Input
                  value={title}
                  onBlur={() => setChangingTitleId('')}
                  onPressEnter={() => setChangingTitleId('')}
                  onChange={handleValueChange}
                ></Input>
              )}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={style.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={!isHidden ? style.btn : ''}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? 'primary' : 'default'}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                />
                <Button
                  size="small"
                  shape="circle"
                  className={!isLocked ? style.btn : ''}
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'default'}
                  onClick={() => changeLock(fe_id)}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}
export default Layer
