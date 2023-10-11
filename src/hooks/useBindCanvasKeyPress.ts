import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer'

// 判断当前选择的组件，非输入框时合法
const isActiveElementValid = () => {
  const activeElement = document.activeElement
  // 没使用 dnd-kit 组件之前
  // if (activeElement == document.body) return true //选中input组件，document.activeElement返回的是input，其他返回的都是body
  // 使用了 dnd-kit 组件之后
  if (activeElement == document.body) return true
  if (activeElement?.matches('div[role="button"]')) return true //匹配dnd-kit的组件
  return false
}
const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()
  // 删除组件
  useKeyPress(['Backspace', 'delete'], () => {
    if (!isActiveElementValid()) return //选中无效组件 直接返回 不执行删除
    dispatch(removeSelectedComponent())
  })
  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copyComponent())
  })
  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteComponent())
  })
  // 上/下切换选中的组件
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
  // 上移
  // 下移
  // 撤销
  // 重做
}

export default useBindCanvasKeyPress
