import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { STAT_COLOR } from '../../../constant'
import { QuestionRadioStatisticProps } from './interface'
const statisticComponent: React.FC<QuestionRadioStatisticProps> = ({ stat = [] }) => {
  const format = (val: number) => {
    return (val * 100).toFixed(2)
  }
  const sum = useMemo(() => {
    let s = 0
    stat.forEach(i => {
      s += i.value
    })
    return s
  }, [stat])
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={i => `${i.name}:${format(i.value / sum)}%`}
          />
          {stat.map((i, index) => {
            return <Cell key={index} fill={STAT_COLOR[index]}></Cell>
          })}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default statisticComponent
