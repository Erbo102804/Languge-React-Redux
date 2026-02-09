import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNews } from '../../store/newsSlice'
import Loader from '../Loader'
import './NewsList.css'

function NewsList({ limit }) {
  const dispatch = useDispatch()
  const { news, loading, error } = useSelector(state => state.news)

  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews())
    }
  }, [dispatch, news.length])

  if (loading) {
    return <Loader text="Загрузка новостей..." />
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>
  }

  const displayedNews = limit ? news.slice(0, limit) : news

  return (
    <section className="news-list">
      <div className="news-list__header">
        <h2 className="news-list__title">Новости и события</h2>
        <p className="news-list__subtitle">
          Будьте в курсе последних обновлений
        </p>
      </div>

      <div className="news-list__grid">
        {displayedNews.map(item => (
          <article key={item.id} className="news-card">
            <div className="news-card__image">
              <img src={item.image} alt={item.title} />
              <span className="news-card__category">{item.category}</span>
            </div>
            <div className="news-card__content">
              <span className="news-card__date">
                {new Date(item.date).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <h3 className="news-card__title">{item.title}</h3>
              <p className="news-card__summary">{item.summary}</p>
              <span className="news-card__author">Автор: {item.author}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default NewsList
