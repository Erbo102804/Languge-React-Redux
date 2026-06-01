import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  sendUserMessage,
  sendTeacherReply,
  selectChat
} from '../../redux/slices/chatSlice'
import './ChatWidget.css'

const TEACHER_REPLIES = [
  'Здравствуйте! Спасибо за интерес к курсу. Чем могу помочь?',
  'Хороший вопрос! На курсе мы подробно разбираем эту тему.',
  'Если есть сомнения по программе — задавайте, я постараюсь развеять.',
  'Конечно! После записи вы получите доступ к материалам и расписанию.',
  'Я отвечу подробнее в течение дня, спасибо за терпение.'
]

const replyFor = (text) => {
  const t = text.toLowerCase()
  if (/привет|здрав|добрый/.test(t)) return 'Здравствуйте! Очень рад вашему интересу к курсу.'
  if (/цена|стоит|стоимость|сколько/.test(t)) return 'Цена курса указана на странице. При записи вы получите доступ ко всем материалам.'
  if (/расписан|когда|время|день/.test(t)) return 'Расписание курса показано на детальной странице и в вашем личном кабинете.'
  if (/программ|тем|изуч/.test(t)) return 'Программа курса расписана в разделе «Что вы изучите». Если нужны детали — спрашивайте по конкретной теме.'
  if (/сертификат|диплом/.test(t)) return 'Да, по итогам обучения вы получите сертификат об окончании курса.'
  if (/спасибо|благодар/.test(t)) return 'Всегда пожалуйста! Если будут ещё вопросы — пишите.'
  return TEACHER_REPLIES[Math.floor(Math.random() * TEACHER_REPLIES.length)]
}

function ChatWidget({ courseId, teacher, courseTitle }) {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const messages = useSelector(selectChat(user?.id, courseId))

  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages.length, isTyping, isOpen])

  const handleSend = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || !isAuthenticated) return

    dispatch(sendUserMessage({
      userId: user.id,
      courseId: Number(courseId),
      teacher,
      text: trimmed
    }))
    setText('')
    setIsTyping(true)

    const delay = 800 + Math.random() * 1000
    setTimeout(() => {
      dispatch(sendTeacherReply({
        userId: user.id,
        courseId: Number(courseId),
        teacher,
        text: replyFor(trimmed)
      }))
      setIsTyping(false)
    }, delay)
  }

  const initials = teacher
    ? teacher.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
    : '👨‍🏫'

  const formatTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      <button
        className={`chat-fab ${isOpen ? 'chat-fab--hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Открыть чат с преподавателем"
      >
        <span className="chat-fab__icon">💬</span>
        <span className="chat-fab__label">Написать преподавателю</span>
        {messages.length > 0 && (
          <span className="chat-fab__badge">{messages.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Чат с преподавателем">
          <div className="chat-panel__header">
            <div className="chat-panel__avatar">{initials}</div>
            <div className="chat-panel__head-info">
              <div className="chat-panel__teacher">{teacher}</div>
              <div className="chat-panel__sub">
                <span className="chat-panel__status" />
                Преподаватель · {courseTitle}
              </div>
            </div>
            <button
              className="chat-panel__close"
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>

          <div className="chat-panel__body" ref={bodyRef}>
            {!isAuthenticated ? (
              <div className="chat-panel__guard">
                <p>Чтобы написать преподавателю, войдите в аккаунт.</p>
                <Link to="/login" className="chat-panel__guard-btn">
                  Войти
                </Link>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="chat-msg chat-msg--teacher">
                    <div className="chat-msg__bubble">
                      Здравствуйте! Я преподаю курс «{courseTitle}». Задавайте вопросы — отвечу!
                    </div>
                  </div>
                )}

                {messages.map(m => (
                  <div
                    key={m.id}
                    className={`chat-msg chat-msg--${m.role}`}
                  >
                    <div className="chat-msg__bubble">{m.text}</div>
                    <div className="chat-msg__time">{formatTime(m.ts)}</div>
                  </div>
                ))}

                {isTyping && (
                  <div className="chat-msg chat-msg--teacher">
                    <div className="chat-msg__bubble chat-msg__bubble--typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {isAuthenticated && (
            <form className="chat-panel__form" onSubmit={handleSend}>
              <input
                className="chat-panel__input"
                type="text"
                placeholder="Напишите сообщение..."
                value={text}
                onChange={e => setText(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="chat-panel__send"
                disabled={!text.trim()}
                aria-label="Отправить"
              >
                ➤
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}

export default ChatWidget
