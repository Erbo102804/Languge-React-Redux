import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseById, clearCurrentCourse, deleteCourse } from '../../store/coursesSlice'
import {
  enroll,
  unenroll,
  selectIsEnrolled,
  getScheduleSlot
} from '../../store/enrollmentsSlice'
import { pushNotification } from '../../store/notificationsSlice'
import CourseForm from '../../components/CourseForm'
import Loader from '../../components/Loader'
import './CourseDetailPage.css'

function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentCourse, loading, error } = useSelector(state => state.courses)
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const isEnrolled = useSelector(selectIsEnrolled(user?.id, id))

  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    dispatch(fetchCourseById(id))
    return () => { dispatch(clearCurrentCourse()) }
  }, [dispatch, id])

  const handleDelete = () => {
    dispatch(deleteCourse(currentCourse.id))
    navigate('/courses')
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      dispatch(pushNotification({
        text: 'Войдите в аккаунт, чтобы записаться на курс',
        type: 'info'
      }))
      navigate('/login')
      return
    }
    dispatch(enroll({ userId: user.id, course: currentCourse }))
    const slot = getScheduleSlot(currentCourse.id)
    dispatch(pushNotification({
      text: `Вы записались на курс «${currentCourse.title}». Занятия: ${slot.day}, ${slot.time}`,
      type: 'success'
    }))
  }

  const handleUnenroll = () => {
    dispatch(unenroll({ userId: user.id, courseId: currentCourse.id }))
    dispatch(pushNotification({
      text: `Вы отписались от курса «${currentCourse.title}»`,
      type: 'info'
    }))
  }

  if (loading) {
    return (
      <div className="course-detail-page">
        <Loader text="Загрузка информации о курсе..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="course-detail-page">
        <div className="error-container">
          <h2>Ошибка</h2>
          <p>{error}</p>
          <Link to="/courses" className="back-btn">Вернуться к курсам</Link>
        </div>
      </div>
    )
  }

  if (!currentCourse) return null

  const slot = getScheduleSlot(currentCourse.id)

  return (
    <div className="course-detail-page">
      <div className="course-detail__nav">
        <Link to="/courses" className="course-detail__back">
          ← Назад к курсам
        </Link>
        <div className="course-detail__crud-actions">
          <button
            className="crud-btn crud-btn--edit"
            onClick={() => setShowEditForm(true)}
          >
            ✏️ Редактировать
          </button>
          <button
            className="crud-btn crud-btn--delete"
            onClick={() => setShowDeleteConfirm(true)}
          >
            🗑️ Удалить
          </button>
        </div>
      </div>

      <div className="course-detail">
        <div className="course-detail__header">
          <div className="course-detail__image">
            <img src={currentCourse.image} alt={currentCourse.title} />
          </div>
          <div className="course-detail__info">
            <span className="course-detail__level">{currentCourse.level}</span>
            <h1 className="course-detail__title">{currentCourse.title}</h1>
            <p className="course-detail__description">{currentCourse.description}</p>

            <div className="course-detail__meta">
              <div className="course-detail__meta-item">
                <span className="meta-label">Преподаватель</span>
                <span className="meta-value">{currentCourse.instructor}</span>
              </div>
              <div className="course-detail__meta-item">
                <span className="meta-label">Длительность</span>
                <span className="meta-value">{currentCourse.duration}</span>
              </div>
              <div className="course-detail__meta-item">
                <span className="meta-label">Уроков</span>
                <span className="meta-value">{currentCourse.lessons}</span>
              </div>
              <div className="course-detail__meta-item">
                <span className="meta-label">Рейтинг</span>
                <span className="meta-value">★ {currentCourse.rating}</span>
              </div>
              <div className="course-detail__meta-item">
                <span className="meta-label">Расписание</span>
                <span className="meta-value">{slot.day}, {slot.time}</span>
              </div>
            </div>

            <div className="course-detail__price-block">
              <span className="course-detail__price">
                {currentCourse.price.toLocaleString()} ₽
              </span>
              <span className="course-detail__students">
                {currentCourse.students} студентов уже обучаются
              </span>
            </div>

            {isEnrolled ? (
              <div className="course-detail__enroll-block">
                <div className="course-detail__enrolled-badge">
                  ✓ Вы записаны на этот курс
                </div>
                <div className="course-detail__enroll-actions">
                  <Link to="/profile" className="course-detail__profile-btn">
                    Личный кабинет
                  </Link>
                  <button
                    className="course-detail__unenroll-btn"
                    onClick={handleUnenroll}
                  >
                    Отписаться
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="course-detail__enroll-btn"
                onClick={handleEnroll}
              >
                Записаться на курс
              </button>
            )}
          </div>
        </div>

        <div className="course-detail__content">
          <section className="course-detail__section">
            <h2 className="course-detail__section-title">О курсе</h2>
            <p className="course-detail__full-description">
              {currentCourse.fullDescription}
            </p>
          </section>

          <section className="course-detail__section">
            <h2 className="course-detail__section-title">Что вы изучите</h2>
            <div className="course-detail__topics">
              {currentCourse.topics.map((topic, index) => (
                <span key={index} className="course-detail__topic">{topic}</span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Форма редактирования */}
      {showEditForm && (
        <CourseForm
          course={currentCourse}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {/* Подтверждение удаления */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-confirm" onClick={e => e.stopPropagation()}>
            <h3>Удалить курс?</h3>
            <p>«{currentCourse.title}» будет удалён. Это действие нельзя отменить.</p>
            <div className="delete-confirm__btns">
              <button className="crud-btn crud-btn--cancel" onClick={() => setShowDeleteConfirm(false)}>
                Отмена
              </button>
              <button className="crud-btn crud-btn--delete" onClick={handleDelete}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetailPage
