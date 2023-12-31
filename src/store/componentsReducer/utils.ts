import { ComponentsStateType, ComponentInfoType } from './index'
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
  if (length <= 1) {
    // 只有一个组件的时候
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      // 删除最后一个组件的时候
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 删除不是最后一个组件
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}

// 插入新组建
export const insertNewComponent = (draft: ComponentsStateType, newComponent: ComponentInfoType) => {
  const { selectedID, componentList } = draft
  const index = componentList.findIndex(i => i.fe_id === selectedID)
  if (index < 0) {
    draft.componentList.push(newComponent)
  } else {
    draft.componentList.splice(index + 1, 0, newComponent)
  }
  draft.selectedID = newComponent.fe_id
}
