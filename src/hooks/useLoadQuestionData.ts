import { useParams } from 'react-router-dom'
import { getQuestionService } from '../service/question'
import { useRequest } from 'ahooks'

const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  // 对于需要传递参数的网络请求，需要封装成异步函数loadFn
  const loadFn = async () => {
    const res = await getQuestionService(id)
    return res
  }
  const { data, error, loading } = useRequest(loadFn)
  return { loading, error, data }
}
export default useLoadQuestionData
