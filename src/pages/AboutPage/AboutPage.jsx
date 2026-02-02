import './AboutPage.css'

function AboutPage() {
  const team = [
    { id: 1, name: 'Алексей Иванов', role: 'CEO & Основатель', emoji: '👨‍💼' },
    { id: 2, name: 'Мария Петрова', role: 'CTO', emoji: '👩‍💻' },
    { id: 3, name: 'Дмитрий Сидоров', role: 'Lead Developer', emoji: '👨‍🔧' },
    { id: 4, name: 'Елена Козлова', role: 'UX Designer', emoji: '👩‍🎨' },
  ]

  return (
    <div className="about-page">
      <div className="page-header">
        <h1 className="page-header__title">О нас</h1>
        <p className="page-header__subtitle">Узнайте больше о нашей команде</p>
      </div>

      <section className="about-mission">
        <h2 className="about-mission__title">Наша миссия</h2>
        <p className="about-mission__text">
          EduHub — это современная образовательная платформа, созданная для того,
          чтобы сделать обучение доступным и эффективным. Мы верим, что качественное
          образование должно быть доступно каждому, независимо от местоположения.
        </p>
        <div className="about-mission__values">
          <div className="value-card">
            <span className="value-card__icon">🎯</span>
            <h3>Качество</h3>
            <p>Лучшие преподаватели и актуальные программы</p>
          </div>
          <div className="value-card">
            <span className="value-card__icon">🚀</span>
            <h3>Инновации</h3>
            <p>Современные технологии в обучении</p>
          </div>
          <div className="value-card">
            <span className="value-card__icon">🤝</span>
            <h3>Поддержка</h3>
            <p>Индивидуальный подход к каждому</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2 className="about-team__title">Наша команда</h2>
        <div className="team-grid">
          {team.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-card__avatar">{member.emoji}</div>
              <h3 className="team-card__name">{member.name}</h3>
              <p className="team-card__role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage
