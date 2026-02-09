import CoursesList from '../../components/CoursesList'
import './CoursesPage.css'

function CoursesPage() {
  return (
    <div className="courses-page">
      <div className="page-header">
        <h1 className="page-header__title">Все курсы</h1>
        <p className="page-header__subtitle">
          Выберите курс и начните своё обучение уже сегодня
        </p>
      </div>

      {/* LIST - все курсы, клик ведёт на DETAIL */}
      <CoursesList />
    </div>
  )
}

export default CoursesPage
