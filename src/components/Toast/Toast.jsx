import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../../store/notificationsSlice'
import './Toast.css'

function ToastItem({ id, text, type }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => dispatch(removeNotification(id)), 3500)
    return () => clearTimeout(timer)
  }, [dispatch, id])

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon">{icon}</span>
      <span className="toast__text">{text}</span>
      <button
        className="toast__close"
        onClick={() => dispatch(removeNotification(id))}
        aria-label="Закрыть"
      >
        ×
      </button>
    </div>
  )
}

function Toast() {
  const items = useSelector(state => state.notifications.items)

  if (items.length === 0) return null

  return (
    <div className="toast-container">
      {items.map(item => (
        <ToastItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export default Toast
