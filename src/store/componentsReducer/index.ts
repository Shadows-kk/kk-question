import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId } from './utils'
export type ComponentInfoType = {
  fe_id: string //前端生成的id，服务端 mongoDB 不认这种格式，所以前端自定义生成一个fe_id
  type: string
  title: string
  isHidden?: boolean
  props: ComponentPropsType
}
export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
  selectedID: string
}
const INIT_STATE: ComponentsStateType = {
  //组件列表
  componentList: [],
  //被选中组件的id
  selectedID: '',
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
        const { selectedID, componentList } = draft
        const index = componentList.findIndex(i => i.fe_id === selectedID)
        if (index < 0) {
          draft.componentList.push(action.payload)
        } else {
          draft.componentList.splice(index + 1, 0, action.payload)
        }
        draft.selectedID = action.payload.fe_id
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
  },
})
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProp,
  removeSelectedComponent,
  changeComponentHidden,
} = componentsSlice.actions
export default componentsSlice.reducer
