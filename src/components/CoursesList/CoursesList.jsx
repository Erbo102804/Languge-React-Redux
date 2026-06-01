import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCourses, deleteCourse } from '../../redux/slices/coursesSlice'
import {
  setCoursesSearch,
  setCoursesLevel,
  resetCoursesFilters,
  selectFilteredCourses
} from '../../redux/slices/uiSlice'
import { useNotify } from '../../hooks/useNotify'
import { formatPrice } from '../../utils/format'
import CourseForm from '../CourseForm'
import Loader from '../Loader'
import './CoursesList.css'

const LEVELS = ['all', 'Начинающий', 'Средний', 'Продвинутый']

function CoursesList({ limit }) {
  const dispatch = useDispatch()
  const notify = useNotify()
  const { courses, loading, error, mutating } = useSelector(state => state.courses)
  const { isAuthenticated } = useSelector(state => state.auth)
  const { coursesSearch, coursesLevel } = useSelector(state => state.ui)
  const filtered = useSelector(selectFilteredCourses)

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

  const confirmDelete = async () => {
    const id = deleteConfirm
    try {
      await dispatch(deleteCourse(id)).unwrap()
      notify('Курс удалён', 'info')
    } catch (err) {
      notify('Ошибка удаления: ' + err, 'error')
    }
    setDeleteConfirm(null)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditCourse(null)
  }

  if (loading) return <Loader text="Загрузка курсов..." />
  if (error) return <div className="error-message">Ошибка: {error}</div>

  const sourceList = limit ? courses : filtered
  const displayedCourses = limit ? sourceList.slice(0, limit) : sourceList
  const title = limit ? 'Популярные курсы' : 'Все курсы'
  const isFiltering = !limit && (coursesSearch.trim() || coursesLevel !== 'all')

  return (
    <section className="courses-list">
      <div className="courses-list__header">
        <div>
          <h2 className="courses-list__title">{title}</h2>
          <p className="courses-list__subtitle">
            Выберите курс и начните обучение уже сегодня
          </p>
        </div>
        {!limit && isAuthenticated && (
          <button
            className="courses-list__add-btn"
            onClick={() => { setEditCourse(null); setShowForm(true) }}
            disabled={mutating}
          >
            + Добавить курс
          </button>
        )}
      </div>

      {!limit && (
        <div className="courses-list__filters">
          <input
            type="search"
            className="courses-list__search"
            placeholder="Поиск по названию, описанию или преподавателю..."
            value={coursesSearch}
            onChange={(e) => dispatch(setCoursesSearch(e.target.value))}
          />
          <div className="courses-list__levels">
            {LEVELS.map(lvl => (
              <button
                key={lvl}
                type="button"
                className={`courses-list__level-btn ${coursesLevel === lvl ? 'courses-list__level-btn--active' : ''}`}
                onClick={() => dispatch(setCoursesLevel(lvl))}
              >
                {lvl === 'all' ? 'Все' : lvl}
              </button>
            ))}
            {isFiltering && (
              <button
                type="button"
                className="courses-list__reset"
                onClick={() => dispatch(resetCoursesFilters())}
              >
                Сбросить
              </button>
            )}
          </div>
          {isFiltering && (
            <div className="courses-list__count">
              Найдено: {filtered.length}
            </div>
          )}
        </div>
      )}

      {displayedCourses.length === 0 && !limit ? (
        <div className="courses-list__empty">
          <p>По вашему запросу курсы не найдены.</p>
          {isFiltering && (
            <button
              type="button"
              className="courses-list__empty-btn"
              onClick={() => dispatch(resetCoursesFilters())}
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      ) : (
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
                  <span className="course-card__price">{formatPrice(course.price)}</span>
                  <span className="course-card__students">{course.students} студентов</span>
                </div>
              </div>
            </Link>

            {isAuthenticated && (
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
            )}
          </div>
        ))}
      </div>

      )}

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
