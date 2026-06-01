import { useDispatch } from 'react-redux'
import { pushNotification } from '../redux/slices/notificationsSlice'

export const useNotify = () => {
  const dispatch = useDispatch()
  return (text, type = 'success') => dispatch(pushNotification({ text, type }))
}
