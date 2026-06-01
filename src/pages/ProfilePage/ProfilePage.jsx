import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { selectUserEnrollments, unenroll } from '../../redux/slices/enrollmentsSlice'
import { pushNotification } from '../../redux/slices/notificationsSlice'
import './ProfilePage.css'

const DAY_ORDER = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

function ProfilePage() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const myCourses = useSelector(selectUserEnrollments(user?.id))

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleUnenroll = (courseId, title) => {
    dispatch(unenroll({ userId: user.id, courseId }))
    dispatch(pushNotification({
      text: `Вы отписались от курса «${title}»`,
      type: 'info'
    }))
  }

  const sortedCourses = [...myCourses].sort((a, b) => {
    const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
    if (dayDiff !== 0) return dayDiff
    return a.time.localeCompare(b.time)
  })

  const totalPrice = myCourses.reduce((sum, c) => sum + (c.price || 0), 0)

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-header__title">Личный кабинет</h1>
        <p className="page-header__subtitle">Ваши курсы и расписание</p>
      </div>

      <div className="profile-card">
        <div className="profile-card__avatar">
          {user.name?.charAt(0).toUpperCase() || '👤'}
        </div>
        <div className="profile-card__info">
          <h2 className="profile-card__name">{user.name}</h2>
          <p className="profile-card__email">{user.email}</p>
        </div>
        <div className="profile-card__stats">
          <div className="profile-card__stat">
            <span className="profile-card__stat-value">{myCourses.length}</span>
            <span className="profile-card__stat-label">Курсов</span>
          </div>
          <div className="profile-card__stat">
            <span className="profile-card__stat-value">
              {totalPrice.toLocaleString()} сом
            </span>
            <span className="profile-card__stat-label">Стоимость</span>
          </div>
        </div>
      </div>

      <section className="profile-section">
        <h2 className="profile-section__title">Мои курсы</h2>

        {myCourses.length === 0 ? (
          <div className="profile-empty">
            <p>Вы пока не записались ни на один курс.</p>
            <Link to="/courses" className="profile-empty__btn">
              Смотреть курсы
            </Link>
          </div>
        ) : (
          <div className="my-courses-grid">
            {sortedCourses.map(c => (
              <div key={c.id} className="my-course-card">
                <div className="my-course-card__head">
                  <img
                    src={c.image}
                    alt={c.courseTitle}
                    className="my-course-card__img"
                  />
                  <div className="my-course-card__head-info">
                    <Link
                      to={`/courses/${c.courseId}`}
                      className="my-course-card__title"
                    >
                      {c.courseTitle}
                    </Link>
                    <span className="my-course-card__level">{c.level}</span>
                  </div>
                </div>

                <div className="my-course-card__rows">
                  <div className="my-course-card__row">
                    <span className="my-course-card__label">📅 День</span>
                    <span className="my-course-card__value">{c.day}</span>
                  </div>
                  <div className="my-course-card__row">
                    <span className="my-course-card__label">🕒 Время</span>
                    <span className="my-course-card__value">{c.time}</span>
                  </div>
                  <div className="my-course-card__row">
                    <span className="my-course-card__label">👨‍🏫 Преподаватель</span>
                    <span className="my-course-card__value">{c.instructor}</span>
                  </div>
                  <div className="my-course-card__row">
                    <span className="my-course-card__label">⏳ Длительность</span>
                    <span className="my-course-card__value">{c.duration}</span>
                  </div>
                </div>

                <button
                  className="my-course-card__unenroll"
                  onClick={() => handleUnenroll(c.courseId, c.courseTitle)}
                >
                  Отписаться
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ProfilePage
