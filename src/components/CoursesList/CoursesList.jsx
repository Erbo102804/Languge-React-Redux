import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCourses, deleteCourse } from '../../store/coursesSlice'
import { toggleLike, toggleFavorite } from '../../store/interactionsSlice'
import CourseForm from '../CourseForm'
import Loader from '../Loader'
import './CoursesList.css'

function CoursesList({ limit }) {
  const dispatch = useDispatch()
  const { courses, loading, error } = useSelector(state => state.courses)
  const { likes, favorites } = useSelector(state => state.interactions)

  const [showForm, setShowForm] = useState(false)
  const [editCourse, setEditCourse] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses())
    }
  }, [dispatch, courses.length])

  const handleEdit = (e, course) => {
    e.preventDefault()
    e.stopPropagation()
    setEditCourse(course)
    setShowForm(true)
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteConfirm(id)
  }

  const confirmDelete = () => {
    dispatch(deleteCourse(deleteConfirm))
    setDeleteConfirm(null)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditCourse(null)
  }

  if (loading) return <Loader text="Загрузка курсов..." />
  if (error) return <div className="error-message">Ошибка: {error}</div>

  const displayedCourses = limit ? courses.slice(0, limit) : courses
  const title = limit ? 'Популярные курсы' : 'Все курсы'

  return (
    <section className="courses-list">
      <div className="courses-list__header">
        <div>
          <h2 className="courses-list__title">{title}</h2>
          <p className="courses-list__subtitle">
            Выберите курс и начните обучение уже сегодня
          </p>
        </div>
        {!limit && (
          <button
            className="courses-list__add-btn"
            onClick={() => { setEditCourse(null); setShowForm(true) }}
          >
            + Добавить курс
          </button>
        )}
      </div>

      <div className="courses-list__grid">
        {displayedCourses.map(course => (
          <div key={course.id} className="course-card-wrapper">
            <Link to={`/courses/${course.id}`} className="course-card">
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

                {/* Like & Favorite — always visible */}
                <div className="course-card__social">
                  <button
                    className={`card-social-btn${likes[course.id] ? ' card-social-btn--liked' : ''}`}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(toggleLike(course.id)) }}
                    title={likes[course.id] ? 'Убрать лайк' : 'Нравится'}
                  >
                    {likes[course.id] ? '❤️' : '🤍'} {likes[course.id] ? 'Нравится' : 'Нравится'}
                  </button>
                  <button
                    className={`card-social-btn${favorites.includes(course.id) ? ' card-social-btn--fav' : ''}`}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(toggleFavorite(course.id)) }}
                    title={favorites.includes(course.id) ? 'Убрать из избранного' : 'В избранное'}
                  >
                    {favorites.includes(course.id) ? '★' : '☆'} {favorites.includes(course.id) ? 'В избранном' : 'Избранное'}
                  </button>
                </div>
              </div>
            </Link>

            <div className="course-card__actions">
              <button
                className="course-card__action-btn course-card__action-btn--edit"
                onClick={(e) => handleEdit(e, course)}
                title="Редактировать"
              >
                ✏️
              </button>
              <button
                className="course-card__action-btn course-card__action-btn--delete"
                onClick={(e) => handleDelete(e, course.id)}
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {limit && courses.length > limit && (
        <div className="courses-list__more">
          <Link to="/courses" className="courses-list__more-btn">
            Смотреть все курсы
          </Link>
        </div>
      )}

      {/* Форма добавления/редактирования */}
      {showForm && (
        <CourseForm course={editCourse} onClose={handleCloseForm} />
      )}

      {/* Подтверждение удаления */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-confirm" onClick={e => e.stopPropagation()}>
            <h3>Удалить курс?</h3>
            <p>Это действие нельзя отменить.</p>
            <div className="delete-confirm__btns">
              <button className="btn btn--cancel" onClick={() => setDeleteConfirm(null)}>
                Отмена
              </button>
              <button className="btn btn--delete" onClick={confirmDelete}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CoursesList
