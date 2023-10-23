import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { QuestionCheckBoxStatisticProps } from './interface'
const statisticComponent: React.FC<QuestionCheckBoxStatisticProps> = ({ stat = [] }) => {
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={150}
          height={40}
          data={stat}
          margin={{ top: 5, right: 30, bottom: 0, left: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
          <XAxis dataKey="name"></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default statisticComponent
