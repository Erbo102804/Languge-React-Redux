import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCourse, updateCourse } from '../../redux/slices/coursesSlice'
import { useNotify } from '../../hooks/useNotify'
import './CourseForm.css'

const emptyForm = {
  title: '',
  description: '',
  fullDescription: '',
  price: '',
  duration: '',
  level: 'Начинающий',
  instructor: '',
  rating: '5.0',
  students: '0',
  lessons: '',
  image: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png',
  topics: ''
}

function CourseForm({ course, onClose }) {
  const dispatch = useDispatch()
  const notify = useNotify()
  const { mutating } = useSelector(state => state.courses)
  const isEdit = Boolean(course)

  const [form, setForm] = useState(
    isEdit
      ? { ...course, topics: course.topics.join(', ') }
      : emptyForm
  )
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Введите название курса'
    if (!form.description.trim()) newErrors.description = 'Введите описание'
    if (!form.instructor.trim()) newErrors.instructor = 'Введите имя преподавателя'
    if (!form.price || isNaN(form.price)) newErrors.price = 'Введите корректную цену'
    if (!form.duration.trim()) newErrors.duration = 'Введите длительность'
    if (!form.lessons || isNaN(form.lessons)) newErrors.lessons = 'Введите количество уроков'
    if (!form.topics.trim()) newErrors.topics = 'Введите хотя бы одну тему'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const courseData = {
      ...form,
      price: Number(form.price),
      students: Number(form.students),
      lessons: Number(form.lessons),
      rating: Number(form.rating),
      topics: form.topics.split(',').map(t => t.trim()).filter(Boolean)
    }

    try {
      if (isEdit) {
        await dispatch(updateCourse({ ...courseData, id: course.id })).unwrap()
        notify(`Курс «${courseData.title}» обновлён`, 'success')
      } else {
        await dispatch(createCourse(courseData)).unwrap()
        notify(`Курс «${courseData.title}» добавлен`, 'success')
      }
      onClose()
    } catch (err) {
      notify('Ошибка: ' + (err || 'не удалось сохранить курс'), 'error')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="course-form" onClick={e => e.stopPropagation()}>
        <div className="course-form__header">
          <h2 className="course-form__title">
            {isEdit ? 'Редактировать курс' : 'Добавить курс'}
          </h2>
          <button className="course-form__close" onClick={onClose}>✕</button>
        </div>

        <form className="course-form__body" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group form-group--full">
              <label className="form-label">Название курса *</label>
              <input
                className={`form-input ${errors.title ? 'form-input--error' : ''}`}
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Например: React для начинающих"
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-group form-group--full">
              <label className="form-label">Краткое описание *</label>
              <input
                className={`form-input ${errors.description ? 'form-input--error' : ''}`}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Краткое описание курса"
              />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            <div className="form-group form-group--full">
              <label className="form-label">Полное описание</label>
              <textarea
                className="form-textarea"
                name="fullDescription"
                value={form.fullDescription}
                onChange={handleChange}
                placeholder="Подробное описание курса..."
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Преподаватель *</label>
              <input
                className={`form-input ${errors.instructor ? 'form-input--error' : ''}`}
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                placeholder="Имя преподавателя"
              />
              {errors.instructor && <span className="form-error">{errors.instructor}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Уровень</label>
              <select
                className="form-select"
                name="level"
                value={form.level}
                onChange={handleChange}
              >
                <option>Начинающий</option>
                <option>Средний</option>
                <option>Продвинутый</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Цена (сом) *</label>
              <input
                className={`form-input ${errors.price ? 'form-input--error' : ''}`}
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="15000"
              />
              {errors.price && <span className="form-error">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Длительность *</label>
              <input
                className={`form-input ${errors.duration ? 'form-input--error' : ''}`}
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="3 месяца"
              />
              {errors.duration && <span className="form-error">{errors.duration}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Количество уроков *</label>
              <input
                className={`form-input ${errors.lessons ? 'form-input--error' : ''}`}
                name="lessons"
                type="number"
                value={form.lessons}
                onChange={handleChange}
                placeholder="45"
              />
              {errors.lessons && <span className="form-error">{errors.lessons}</span>}
            </div>

            <div className="form-group form-group--full">
              <label className="form-label">Темы (через запятую) *</label>
              <input
                className={`form-input ${errors.topics ? 'form-input--error' : ''}`}
                name="topics"
                value={form.topics}
                onChange={handleChange}
                placeholder="JSX, Компоненты, Хуки, Router"
              />
              {errors.topics && <span className="form-error">{errors.topics}</span>}
            </div>
          </div>

          <div className="course-form__footer">
            <button type="button" className="btn btn--cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--submit" disabled={mutating}>
              {mutating ? 'Сохранение...' : (isEdit ? 'Сохранить' : 'Добавить курс')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CourseForm
