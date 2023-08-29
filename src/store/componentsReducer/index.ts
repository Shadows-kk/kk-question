import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'
import { ComponentPropsType } from '../../components/QuestionComponents'
export type ComponentInfoType = {
  fe_id: string //TODO
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
  },
})
export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions
export default componentsSlice.reducer
