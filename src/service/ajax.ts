import axios from 'axios'
import { message } from 'antd'

export type ResDataType = {
  [key: string]: any
}
export type ResType = {
  errorno: number
  data?: ResDataType
  msg?: string
}

const instance = axios.create({
  timeout: 10 * 1000,
})
// response拦截
instance.interceptors.response.use(res => {
  const { errorno, data, msg } = (res.data || {}) as ResType
  if (errorno !== 0) {
    if (msg) {
      message.error(msg)
    } else {
      message.error('请求出错！')
    }
    throw new Error(msg)
  }

  return data as any
})

export default instance
