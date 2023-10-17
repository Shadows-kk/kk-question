import React, { useState } from 'react'
import { useRequest } from 'ahooks'
import { Typography, Spin, Table } from 'antd'
import { useParams } from 'react-router-dom'
import { getQuestionStatisticService } from '../../../service/statistic'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
const { Title } = Typography
const PageStatistic: React.FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { id = '' } = useParams()
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatisticService(id, { page: 1, pageSize: 10 })
      return res
    },
    {
      onSuccess(res) {
        const { list = [], total } = res
        setList(list)
        setTotal(total)
      },
    }
  )
  const { componentList } = useGetComponentInfo()
  const columns = componentList.map(i => {
    const { fe_id, title, props = {}, type } = i
    return {
      dataIndex: fe_id,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {props!.title || title}
          </span>
        </div>
      ),
    }
  })
  const dataSource = list.map((i: any) => ({ ...i, key: i._id }))
  const TableEle = <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
  return (
    <div>
      <Title level={3}>问卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableEle}
    </div>
  )
}
export default PageStatistic
