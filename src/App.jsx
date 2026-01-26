import { useSelector, useDispatch } from 'react-redux'
import { removeStudent } from './store/studentsSlice'
import './App.css'

function App() {
  const students = useSelector(state => state.students.students)
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(removeStudent(id))
  }

  return (
    <div className="app">
      <h1>Список студентов</h1>
      <h2>React Redux Demo</h2>

      <div className="students-list">
        {students.map(student => (
          <div key={student.id} className="student-card">
            <h3>{student.name}</h3>
            <p>Возраст: {student.age} лет</p>
            <p>Курс: {student.course}</p>
            <button onClick={() => handleRemove(student.id)}>
              Удалить
            </button>
          </div>
        ))}
      </div>

      {students.length === 0 && (
        <p className="empty-message">Список студентов пуст</p>
      )}
    </div>
  )
}

export default App
