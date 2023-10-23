import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import getUserInfo from './useGetUserInfo'
import {
  isNoNeedUserInfo,
  isLoginOrRegister,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from '../router/index'
function useNavPage(waitingUserData: boolean) {
  const nav = useNavigate()
  const { username } = getUserInfo()
  const { pathname } = useLocation()
  console.log(pathname)
  useEffect(() => {
    if (waitingUserData) return
    // 已经登录 跳转判断
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
  return
}
export default useNavPage
