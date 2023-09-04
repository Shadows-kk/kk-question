import { ComponentInfoType } from './index'
// 获取下一个选中id
export const getNextSelectedId = (fe_id: string, componentList: ComponentInfoType[]) => {
  const visibleComponentList = componentList.filter(i => !i.isHidden)
  const index = visibleComponentList.findIndex(i => i.fe_id === fe_id)
  if (index < 0) {
    return ''
  }
  // 重新计算id
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length < 1) {
    // 只有一个组件的时候
    newSelectedId = ''
  } else {
    if (index === length - 1) {
      // 删除最后一个组件的时候
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 删除不是最后一个组件
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}
