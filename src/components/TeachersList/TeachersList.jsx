import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTeachers } from '../../store/teachersSlice'
import Loader from '../Loader'
import './TeachersList.css'

function TeachersList() {
  const dispatch = useDispatch()
  const { teachers, loading, error } = useSelector(state => state.teachers)

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchTeachers())
    }
  }, [dispatch, teachers.length])

  if (loading) {
    return <Loader text="Загрузка преподавателей..." />
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>
  }

  return (
    <section className="teachers-list">
      <div className="teachers-list__header">
        <h2 className="teachers-list__title">Наши преподаватели</h2>
        <p className="teachers-list__subtitle">
          Опытные специалисты из ведущих IT-компаний
        </p>
      </div>

      <div className="teachers-list__grid">
        {teachers.map(teacher => (
          <article key={teacher.id} className="teacher-card">
            <div className="teacher-card__avatar">
              <img src={teacher.avatar} alt={teacher.name} />
            </div>
            <div className="teacher-card__content">
              <h3 className="teacher-card__name">{teacher.name}</h3>
              <span className="teacher-card__position">{teacher.position}</span>
              <p className="teacher-card__bio">{teacher.bio}</p>
              <div className="teacher-card__stats">
                <div className="teacher-card__stat">
                  <span className="teacher-card__stat-value">{teacher.courses}</span>
                  <span className="teacher-card__stat-label">курсов</span>
                </div>
                <div className="teacher-card__stat">
                  <span className="teacher-card__stat-value">{teacher.students}</span>
                  <span className="teacher-card__stat-label">студентов</span>
                </div>
                <div className="teacher-card__stat">
                  <span className="teacher-card__stat-value">★ {teacher.rating}</span>
                  <span className="teacher-card__stat-label">рейтинг</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TeachersList
