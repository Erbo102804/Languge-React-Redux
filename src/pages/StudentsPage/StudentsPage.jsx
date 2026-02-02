import StudentsList from '../../components/StudentsList'
import './StudentsPage.css'

function StudentsPage() {
  return (
    <div className="students-page">
      <div className="page-header">
        <h1 className="page-header__title">Студенты</h1>
        <p className="page-header__subtitle">Управление базой студентов</p>
      </div>
      <StudentsList />
    </div>
  )
}

export default StudentsPage
