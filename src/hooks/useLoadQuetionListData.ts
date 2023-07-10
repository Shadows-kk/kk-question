import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionList } from '../service/question'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

function useLoadQuetionListData() {
  const [searchParams] = useSearchParams()
  console.log('keyword', searchParams.get(LIST_SEARCH_PARAM_KEY))
  const { data, error, loading } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const data = await getQuestionList({ keyword })
      return data
    },
    {
      refreshDeps: [searchParams], //刷新的依赖项
    }
  )
  return { data, error, loading }
}
export default useLoadQuetionListData
