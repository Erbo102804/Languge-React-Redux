import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseById, clearCurrentCourse } from '../../store/coursesSlice'
import Loader from '../../components/Loader'
import './CourseDetailPage.css'

function CourseDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentCourse, loading, error } = useSelector(state => state.courses)

  useEffect(() => {
    dispatch(fetchCourseById(id))

    return () => {
      dispatch(clearCurrentCourse())
    }
  }, [dispatch, id])

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
          <Link to="/courses" className="back-btn">
            Вернуться к курсам
          </Link>
        </div>
      </div>
    )
  }

  if (!currentCourse) {
    return null
  }

  return (
    <div className="course-detail-page">
      <Link to="/courses" className="course-detail__back">
        ← Назад к курсам
      </Link>

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
            </div>

            <div className="course-detail__price-block">
              <span className="course-detail__price">
                {currentCourse.price.toLocaleString()} ₽
              </span>
              <span className="course-detail__students">
                {currentCourse.students} студентов уже обучаются
              </span>
            </div>

            <button className="course-detail__enroll-btn">
              Записаться на курс
            </button>
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
                <span key={index} className="course-detail__topic">
                  {topic}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
