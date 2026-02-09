import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCourses } from '../../store/coursesSlice'
import Loader from '../Loader'
import './CoursesList.css'

function CoursesList({ limit }) {
  const dispatch = useDispatch()
  const { courses, loading, error } = useSelector(state => state.courses)

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses())
    }
  }, [dispatch, courses.length])

  if (loading) {
    return <Loader text="Загрузка курсов..." />
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>
  }

  const displayedCourses = limit ? courses.slice(0, limit) : courses

  return (
    <section className="courses-list">
      <div className="courses-list__header">
        <h2 className="courses-list__title">Популярные курсы</h2>
        <p className="courses-list__subtitle">
          Выберите курс и начните обучение уже сегодня
        </p>
      </div>

      <div className="courses-list__grid">
        {displayedCourses.map(course => (
          <Link
            to={`/courses/${course.id}`}
            key={course.id}
            className="course-card"
          >
            <div className="course-card__image">
              <img src={course.image} alt={course.title} />
              <span className="course-card__level">{course.level}</span>
            </div>
            <div className="course-card__content">
              <h3 className="course-card__title">{course.title}</h3>
              <p className="course-card__description">{course.description}</p>
              <div className="course-card__meta">
                <span className="course-card__duration">{course.duration}</span>
                <span className="course-card__rating">★ {course.rating}</span>
              </div>
              <div className="course-card__footer">
                <span className="course-card__price">{course.price.toLocaleString()} ₽</span>
                <span className="course-card__students">{course.students} студентов</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {limit && courses.length > limit && (
        <div className="courses-list__more">
          <Link to="/courses" className="courses-list__more-btn">
            Смотреть все курсы
          </Link>
        </div>
      )}
    </section>
  )
}

export default CoursesList
