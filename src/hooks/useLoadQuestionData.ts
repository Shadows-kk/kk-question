import { useParams } from 'react-router-dom'
import { getQuestionService } from '../service/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer/index'
import { resetPageInfo } from '../store/pageInfoReducer'

const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  const { data, error, loading, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷id')
      const res = await getQuestionService(id)
      return res
    },
    {
      manual: true,
    }
  )
  // 监听data的变化，将获取的数据存入redux中
  useEffect(() => {
    if (!data) return
    const {
      componentList = [],
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
    } = data
    let selectedID = ''
    if (componentList.length > 0) {
      selectedID = componentList[0].fe_id
    }
    // 1.把 componentList 存入 redux中
    dispatch(resetComponents({ componentList, selectedID, copiedComponent: null }))
    // 2. 把 pageInfo 存入 redux中
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])
  //监听到id变化，获取问卷的详情数据
  useEffect(() => {
    run(id)
  }, [id])
  return { error, loading }
}
export default useLoadQuestionData
