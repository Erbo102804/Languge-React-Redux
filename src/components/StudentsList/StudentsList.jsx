import { useSelector, useDispatch } from 'react-redux'
import { removeStudent } from '../../store/studentsSlice'
import './StudentsList.css'

function StudentsList() {
  const students = useSelector(state => state.students.students)
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(removeStudent(id))
  }

  return (
    <section className="students">
      <div className="students__header">
        <h2 className="students__title">Наши студенты</h2>
        <p className="students__subtitle">
          Талантливые люди, которые выбрали путь развития вместе с нами
        </p>
      </div>

      <div className="students__grid">
        {students.map(student => (
          <article key={student.id} className="student-card">
            <div className="student-card__avatar">
              {student.name.charAt(0)}
            </div>
            <div className="student-card__content">
              <h3 className="student-card__name">{student.name}</h3>
              <div className="student-card__info">
                <span className="student-card__age">
                  <i className="icon-age"></i>
                  {student.age} лет
                </span>
                <span className="student-card__course">
                  <i className="icon-course"></i>
                  {student.course}
                </span>
              </div>
            </div>
            <button
              className="student-card__remove"
              onClick={() => handleRemove(student.id)}
              aria-label="Удалить студента"
            >
              ✕
            </button>
          </article>
        ))}
      </div>

      {students.length === 0 && (
        <div className="students__empty">
          <span className="students__empty-icon">📚</span>
          <p className="students__empty-text">Список студентов пуст</p>
        </div>
      )}
    </section>
  )
}

export default StudentsList
