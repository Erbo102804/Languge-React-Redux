import './CoursesPage.css'

function CoursesPage() {
  const courses = [
    { id: 1, name: 'React', level: 'Продвинутый', duration: '3 месяца', students: 45 },
    { id: 2, name: 'JavaScript', level: 'Начальный', duration: '2 месяца', students: 78 },
    { id: 3, name: 'Redux', level: 'Средний', duration: '1 месяц', students: 32 },
    { id: 4, name: 'TypeScript', level: 'Средний', duration: '2 месяца', students: 56 },
    { id: 5, name: 'Node.js', level: 'Продвинутый', duration: '3 месяца', students: 41 },
    { id: 6, name: 'Python', level: 'Начальный', duration: '2 месяца', students: 89 },
  ]

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1 className="page-header__title">Курсы</h1>
        <p className="page-header__subtitle">Выберите направление для изучения</p>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-card__icon">📘</div>
            <h3 className="course-card__name">{course.name}</h3>
            <span className={`course-card__level course-card__level--${course.level === 'Начальный' ? 'beginner' : course.level === 'Средний' ? 'intermediate' : 'advanced'}`}>
              {course.level}
            </span>
            <div className="course-card__details">
              <span>⏱ {course.duration}</span>
              <span>👥 {course.students} студентов</span>
            </div>
            <button className="course-card__btn">Записаться</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
