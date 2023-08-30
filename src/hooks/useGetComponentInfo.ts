import { useSelector } from 'react-redux'
import { Statetype } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

const useGetComponentInfo = () => {
  const components = useSelector<Statetype>(state => state.components) as ComponentsStateType
  const { componentList = [], selectedID = '' } = components
  const selectedComponent = componentList.find(i => i.fe_id === selectedID)
  return {
    componentList,
    selectedID,
    selectedComponent,
  }
}
export default useGetComponentInfo
