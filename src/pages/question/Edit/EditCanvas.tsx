import React, { MouseEvent } from 'react'
import { Spin } from 'antd'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import style from './EditCanvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'
type PropsType = {
  loading: boolean
}
// 获取组件
function getComponent(component: ComponentInfoType) {
  const { type, props } = component
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props}></Component>
}
const EditCanvas: React.FC<PropsType> = ({ loading }) => {
  const { componentList, selectedID } = useGetComponentInfo()
  const dispatch = useDispatch()

  const handleClick = (event: MouseEvent, id: string) => {
    event.stopPropagation() //阻止冒泡
    dispatch(changeSelectedId(id))
  }
  // 绑定快捷键
  useBindCanvasKeyPress()
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    )
  }
  // SortableContainer的items属性，需要每个item都有id
  const componentListWidthId = componentList.map(item => {
    return { ...item, id: item.fe_id }
  })
  // 拖拽排序结束
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWidthId} onDragEnd={handleDragEnd}>
      <div className={style.canvas}>
        {componentList
          .filter(i => !i.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c
            // 使用classNames拼接样式
            const wraperDefaultClassName = style['component-wrapper']
            const selectedClassName = style.selected
            const lockedClassName = style.locked
            const wrapperClassName = classNames({
              [wraperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedID,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={style.component}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}
export default EditCanvas
