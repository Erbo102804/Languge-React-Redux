import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserEnrollments } from '../../redux/slices/enrollmentsSlice'
import './SchedulePage.css'

const DAY_ORDER = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

function SchedulePage() {
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const myCourses = useSelector(selectUserEnrollments(user?.id))

  const generalSchedule = [
    { id: 1, day: 'Понедельник', time: '10:00 - 12:00', course: 'React', teacher: 'Иванов А.П.' },
    { id: 2, day: 'Понедельник', time: '14:00 - 16:00', course: 'JavaScript', teacher: 'Петрова М.С.' },
    { id: 3, day: 'Вторник', time: '10:00 - 12:00', course: 'TypeScript', teacher: 'Сидоров К.В.' },
    { id: 4, day: 'Среда', time: '12:00 - 14:00', course: 'Redux', teacher: 'Иванов А.П.' },
    { id: 5, day: 'Четверг', time: '10:00 - 12:00', course: 'Node.js', teacher: 'Козлова Е.Н.' },
    { id: 6, day: 'Пятница', time: '14:00 - 16:00', course: 'Python', teacher: 'Новиков Д.А.' },
  ]

  const sortedMy = [...myCourses].sort((a, b) => {
    const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
    if (dayDiff !== 0) return dayDiff
    return a.time.localeCompare(b.time)
  })

  return (
    <div className="schedule-page">
      <div className="page-header">
        <h1 className="page-header__title">Расписание</h1>
        <p className="page-header__subtitle">Актуальное расписание занятий</p>
      </div>

      <section className="schedule-section">
        <div className="schedule-section__head">
          <h2 className="schedule-section__title">
            Моё расписание
            {sortedMy.length > 0 && (
              <span className="schedule-section__count">{sortedMy.length}</span>
            )}
          </h2>
          {isAuthenticated && sortedMy.length > 0 && (
            <Link to="/profile" className="schedule-section__link">
              В личный кабинет →
            </Link>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="schedule-empty">
            <p>Чтобы видеть свои занятия, войдите в аккаунт.</p>
            <Link to="/login" className="schedule-empty__btn">Войти</Link>
          </div>
        ) : sortedMy.length === 0 ? (
          <div className="schedule-empty">
            <p>У вас пока нет курсов. Запишитесь на любой из них.</p>
            <Link to="/courses" className="schedule-empty__btn">Выбрать курс</Link>
          </div>
        ) : (
          <div className="schedule-table-wrapper schedule-table-wrapper--my">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>День</th>
                  <th>Время</th>
                  <th>Курс</th>
                  <th>Преподаватель</th>
                </tr>
              </thead>
              <tbody>
                {sortedMy.map(item => (
                  <tr key={item.id} className="schedule-row--my">
                    <td>{item.day}</td>
                    <td>{item.time}</td>
                    <td>
                      <Link
                        to={`/courses/${item.courseId}`}
                        className="schedule-course"
                      >
                        {item.courseTitle}
                      </Link>
                    </td>
                    <td>{item.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="schedule-section">
        <div className="schedule-section__head">
          <h2 className="schedule-section__title">Общее расписание</h2>
        </div>
        <div className="schedule-table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>День</th>
                <th>Время</th>
                <th>Курс</th>
                <th>Преподаватель</th>
              </tr>
            </thead>
            <tbody>
              {generalSchedule.map(item => (
                <tr key={item.id}>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td><span className="schedule-course">{item.course}</span></td>
                  <td>{item.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default SchedulePage
