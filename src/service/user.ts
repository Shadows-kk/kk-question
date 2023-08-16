import instance from './ajax'
import type { ResDataType } from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = `/api/user/info`
  const data = (await instance.get(url)) as ResDataType
  return data
}
// 注册用户
export async function resgisterUserService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = `/api/user/register`
  const body = {
    username,
    password,
    nickname: nickname || username,
  }
  const data = (await instance.post(url, body)) as ResDataType
  return data
}
// 用户登陆
export async function userLoginService(username: string, password: string): Promise<ResDataType> {
  const url = `/api/user/login`
  const body = {
    username,
    password,
  }
  const data = (await instance.post(url, body)) as ResDataType
  return data
}
