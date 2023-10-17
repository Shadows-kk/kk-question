import instance from './ajax'
import type { ResDataType } from './ajax'

// 获取统计列表
export async function getQuestionStatisticService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/statistic/${questionId}`
  const data = (await instance.get(url, { params: opt })) as ResDataType
  return data
}
