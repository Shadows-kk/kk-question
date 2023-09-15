import { useSelector } from 'react-redux'
import { Statetype } from '../store'
import { PageInfoType } from '../store/pageInfoReducer'

const useGetPageInfo = () => {
  const pageInfo = useSelector<Statetype>(state => state.pageInfo) as PageInfoType
  return pageInfo
}
export default useGetPageInfo
