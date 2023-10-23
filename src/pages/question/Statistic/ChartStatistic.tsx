import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentStatisticService } from '../../../service/statistic'
import { getComponentConfByType } from '@/components/QuestionComponents'
const { Title, Text } = Typography
type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}
const ChartStatistic: React.FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (componentId, selectedId) => await getComponentStatisticService(componentId, selectedId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )
  useEffect(() => {
    if (selectedComponentId) {
      run(id, selectedComponentId)
    }
  }, [id, selectedComponentId])
  const getStatElem = () => {
    if (!selectedComponentId) return <Text>未选中组件</Text>
    // 根据类型获取组件配置-再从配置获取统计组件
    const { StatisticComponent } = getComponentConfByType(selectedComponentType) || {}
    if (StatisticComponent == null) return <Text>该组件无统计图表</Text>
    return <StatisticComponent stat={stat} />
  }
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{getStatElem()}</div>
    </>
  )
}
export default ChartStatistic
