import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
export type ComponentInfoType = {
  fe_id: string //前端生成的id，服务端 mongoDB 不认这种格式，所以前端自定义生成一个fe_id
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}
export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
  selectedID: string
  copiedComponent: ComponentInfoType | null
}
const INIT_STATE: ComponentsStateType = {
  //组件列表
  componentList: [],
  //被选中组件的id
  selectedID: '',
  // 复制的组件
  copiedComponent: null,
}
const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改selectedID, immer 用来改变react state的不可变数据写法
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedID = action.payload
    }),
    // 点击组件库组件 添加组件至画布中
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload

        insertNewComponent(draft, newComponent)
      }
    ),
    // 修改组件属性
    changeComponentProp: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        // 当前需要修改属性的组件
        const curComponent = draft.componentList.find(i => i.fe_id === fe_id)
        if (curComponent) {
          curComponent.props = {
            ...curComponent.props,
            ...newProps,
          }
        }
      }
    ),
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList, selectedID: deleteID } = draft
      // 重新计算selectedID
      const newSelectedId = getNextSelectedId(deleteID, componentList)
      draft.componentList = draft.componentList.filter(i => i.fe_id !== draft.selectedID)
      draft.selectedID = newSelectedId
    }),
    // 切换组件显示与隐藏
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { fe_id, isHidden } = action.payload
        // 重新计算selectedID
        let newSelectedId = ''
        if (isHidden) {
          // 隐藏
          newSelectedId = getNextSelectedId(fe_id, draft.componentList)
        } else {
          // 显示
          newSelectedId = fe_id
        }
        draft.selectedID = newSelectedId
        const curComponent = draft.componentList.find(i => i.fe_id === fe_id)
        if (curComponent) {
          curComponent.isHidden = isHidden
        }
      }
    ),
    // 切换组件的锁定与解锁
    toggleComponentLock: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload
        const curComponent = draft.componentList.find(i => i.fe_id === fe_id)
        if (curComponent) {
          curComponent.isLocked = !curComponent.isLocked
        }
      }
    ),
    // 复制组件
    copyComponent: produce((draft: ComponentsStateType) => {
      const { selectedID = '', componentList = [] } = draft
      const curComponent = componentList.find(i => i.fe_id === selectedID)
      if (curComponent == null) return
      draft.copiedComponent = curComponent
    }),
    // 粘贴组件
    pasteComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return
      // 粘贴的组件 需要修改fe_id
      copiedComponent.fe_id = nanoid()
      // 插入组件
      insertNewComponent(draft, copiedComponent)
    }),
    // 选中上一个组件
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { componentList, selectedID } = draft
      const index = componentList.findIndex(i => i.fe_id === selectedID)
      if (index > 0) draft.selectedID = componentList[index - 1].fe_id
    }),
    // 选中下一个组件
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { componentList, selectedID } = draft
      const index = componentList.findIndex(i => i.fe_id === selectedID)
      if (index < 0) return
      if (index < componentList.length - 1) draft.selectedID = componentList[index + 1].fe_id
    }),
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponent } = draft
        const { oldIndex, newIndex } = action.payload
        draft.componentList = arrayMove(curComponent, oldIndex, newIndex)
      }
    ),
    // 撤销
    // 重做

    // 修改标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { fe_id, title } = action.payload
        const curComponent = draft.componentList.find(i => i.fe_id === fe_id)
        if (curComponent) {
          curComponent.title = title
        }
      }
    ),
  },
})
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProp,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
