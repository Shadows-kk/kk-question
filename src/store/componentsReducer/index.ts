import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'
export type ComponentInfoType = {
  fe_id: string //前端生成的id，服务端 mongoDB 不认这种格式，所以前端自定义生成一个fe_id
  type: string
  title: string
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
  },
})
export const { resetComponents, changeSelectedId, addComponent, changeComponentProp } =
  componentsSlice.actions
export default componentsSlice.reducer
