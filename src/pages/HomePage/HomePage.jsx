import StudentsList from '../../components/StudentsList'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Добро пожаловать в <span className="hero__highlight">EduHub</span>
          </h1>
          <p className="hero__description">
            Современная платформа для управления образовательным процессом.
            Отслеживайте прогресс студентов, управляйте курсами и расписанием.
          </p>
          <div className="hero__actions">
            <button className="hero__btn hero__btn--primary">
              Начать обучение
            </button>
            <button className="hero__btn hero__btn--secondary">
              Узнать больше
            </button>
          </div>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">500+</span>
            <span className="hero__stat-label">Студентов</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">50+</span>
            <span className="hero__stat-label">Курсов</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">30+</span>
            <span className="hero__stat-label">Преподавателей</span>
          </div>
        </div>
      </section>

      <StudentsList />
    </div>
  )
}

export default HomePage
