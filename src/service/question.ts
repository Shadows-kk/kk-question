import instance from './ajax'
import type { ResDataType } from './ajax'

// 获取耽搁问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await instance.get(url)) as ResDataType
  return data
}
// 创建问卷
export async function createQuestionService() {
  const url = `/api/question`
  const data = (await instance.post(url)) as ResDataType
  return data
}
// 获取问卷列表
export async function getQuestionList() {
  const url = `/api/questionList`
  const data = (await instance.get(url)) as ResDataType
  return data
}
