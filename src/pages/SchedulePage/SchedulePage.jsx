import './SchedulePage.css'

function SchedulePage() {
  const schedule = [
    { id: 1, day: 'Понедельник', time: '10:00 - 12:00', course: 'React', teacher: 'Иванов А.П.' },
    { id: 2, day: 'Понедельник', time: '14:00 - 16:00', course: 'JavaScript', teacher: 'Петрова М.С.' },
    { id: 3, day: 'Вторник', time: '10:00 - 12:00', course: 'TypeScript', teacher: 'Сидоров К.В.' },
    { id: 4, day: 'Среда', time: '12:00 - 14:00', course: 'Redux', teacher: 'Иванов А.П.' },
    { id: 5, day: 'Четверг', time: '10:00 - 12:00', course: 'Node.js', teacher: 'Козлова Е.Н.' },
    { id: 6, day: 'Пятница', time: '14:00 - 16:00', course: 'Python', teacher: 'Новиков Д.А.' },
  ]

  return (
    <div className="schedule-page">
      <div className="page-header">
        <h1 className="page-header__title">Расписание</h1>
        <p className="page-header__subtitle">Актуальное расписание занятий</p>
      </div>

      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>День</th>
              <th>Время</th>
              <th>Курс</th>
              <th>Преподаватель</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(item => (
              <tr key={item.id}>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td><span className="schedule-course">{item.course}</span></td>
                <td>{item.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SchedulePage
