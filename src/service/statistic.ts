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
// 获取耽搁组件的统计数据汇总
export async function getComponentStatisticService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/statistic/${questionId}/${componentId}`
  const data = (await instance.get(url)) as ResDataType
  return data
}
