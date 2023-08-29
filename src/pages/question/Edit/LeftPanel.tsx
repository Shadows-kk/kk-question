import React from 'react'
import { Tabs } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import Layer from './Layer'

const LeftPanel: React.FC = () => {
  const tabsItems = [
    {
      key: 'componentLab',
      label: (
        <span>
          <AppstoreOutlined></AppstoreOutlined>
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined></BarsOutlined>
          图层
        </span>
      ),
      children: <Layer />,
    },
  ]
  return <Tabs defaultActiveKey="componentLab" items={tabsItems} />
}
export default LeftPanel
