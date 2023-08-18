import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserInfoService } from '../service/user'
import { getToken } from '../utils/user-token'
import useGetUserInfo from './useGetUserInfo'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const dispatch = useDispatch()
  // 用户信息的请求状态，判断是否完成请求
  const [waitingUserData, setWaitUserData] = useState(true)
  // 判断是否 redux 中是否有用户信息，有则不需要发送ajax请求
  const { username } = useGetUserInfo()
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      console.log(res)
      const { username, nickname } = res
      //请求到的数据，放入redux中
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitUserData(false)
    },
  })
  useEffect(() => {
    if (username) {
      setWaitUserData(false)
      return
    } else {
      const token = getToken()
      // if (!token) return
      run() //如果redux中没有数据，则发送ajax请求
    }
  }, [username])
  return { waitingUserData } //请求的用户数据放在redux，不需要返回，只需要返回请求状态判断是否完成
}
export default useLoadUserData
