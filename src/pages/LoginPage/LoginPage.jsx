import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, clearError } from '../../redux/slices/authSlice'
import './LoginPage.css'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error } = useSelector(state => state.auth)

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    return () => { dispatch(clearError()) }
  }, [dispatch])

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) newErrors.email = 'Введите email'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Некорректный email'
    if (!form.password) newErrors.password = 'Введите пароль'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    dispatch(login(form))
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Вход</h1>
          <p className="auth-card__subtitle">Войдите в свой аккаунт EduHub</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-form__group">
            <label className="auth-form__label">Email</label>
            <input
              type="email"
              name="email"
              className={`auth-form__input ${errors.email ? 'auth-form__input--error' : ''}`}
              placeholder="example@mail.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="auth-form__error">{errors.email}</span>}
          </div>

          <div className="auth-form__group">
            <label className="auth-form__label">Пароль</label>
            <input
              type="password"
              name="password"
              className={`auth-form__input ${errors.password ? 'auth-form__input--error' : ''}`}
              placeholder="Введите пароль"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="auth-form__error">{errors.password}</span>}
          </div>

          <button type="submit" className="auth-form__submit">
            Войти
          </button>
        </form>

        <div className="auth-card__footer">
          <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
