import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentStatisticService } from '../../../service/statistic'

const { Title } = Typography
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
    if (!selectedComponentId) return <div>未选中组件</div>
    return <div>{JSON.stringify(stat)}</div>
  }
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{getStatElem()}</div>
    </>
  )
}
export default ChartStatistic
