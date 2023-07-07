import instance from './ajax'
import type { ResDataType } from './ajax'

export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await instance.get(url)) as ResDataType
  return data
}
