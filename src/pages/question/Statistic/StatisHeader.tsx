import React, { useRef } from 'react'
import { Space, Button, Typography, Input, Tooltip, message, Popover } from 'antd'
import type { InputRef } from 'antd'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from 'qrcode.react'
import style from './StatisHeader.module.scss'
import useGetPageInfo from '@/hooks/useGetPageInfo'

const { Title } = Typography
const StatisHeader: React.FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { title, isPublished } = useGetPageInfo()
  // 生成链接和二维码
  const linkInputRef = useRef<InputRef>(null)
  const genLinkAndQRcode = () => {
    if (!isPublished) return null
    // 拼接url，需要参考c端的规则
    const url = `http://localhost:3000/question/${id}`
    const copyLink = () => {
      const ele = linkInputRef.current
      if (ele == null) return
      ele.select()
      document.execCommand('copy')
      message.success('复制成功')
    }
    // 生成二维码
    const QRCodeEle = <QRCode value={url} size={150} renderAs="canvas" />
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={linkInputRef}></Input>
        <Tooltip title="复制链接">
          <Button icon={<CopyOutlined />} onClick={copyLink}></Button>
        </Tooltip>
        <Popover content={QRCodeEle}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }
  return (
    <div className={style['header-wrapper']}>
      <div className={style['header']}>
        <div className={style['left']}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={style['center']}>{genLinkAndQRcode()}</div>
        <div className={style['right']}>
          <Button
            type="primary"
            onClick={() => {
              nav(`/question/edit/${id}`)
            }}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}
export default StatisHeader
