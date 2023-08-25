import { useSelector } from 'react-redux'
import { Statetype } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

const useGetComponentInfo = () => {
  const components = useSelector<Statetype>(state => state.components) as ComponentsStateType
  const { componentList = [] } = components
  return {
    componentList,
  }
}
export default useGetComponentInfo
