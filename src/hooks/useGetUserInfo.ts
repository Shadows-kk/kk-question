import { useSelector, useDispatch } from 'react-redux'
import { loginReducer, logoutReducer } from '../store/userReducer'
import type { Statetype } from '../store/index'
import type { UserStateType } from '../store/userReducer'

function getUserInfo() {
  const { username, nickname } = useSelector<Statetype>(state => state.user) as UserStateType
  return { username, nickname }
}
export default getUserInfo
