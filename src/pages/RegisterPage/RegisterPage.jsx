import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register, clearError } from '../../store/authSlice'
import './RegisterPage.css'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error } = useSelector(state => state.auth)

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
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
    if (!form.name.trim()) newErrors.name = 'Введите имя'
    if (!form.email.trim()) newErrors.email = 'Введите email'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Некорректный email'
    if (!form.password) newErrors.password = 'Введите пароль'
    else if (form.password.length < 6) newErrors.password = 'Минимум 6 символов'
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают'
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
    dispatch(register({ name: form.name, email: form.email, password: form.password }))
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Регистрация</h1>
          <p className="auth-card__subtitle">Создайте аккаунт в EduHub</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-form__group">
            <label className="auth-form__label">Имя</label>
            <input
              type="text"
              name="name"
              className={`auth-form__input ${errors.name ? 'auth-form__input--error' : ''}`}
              placeholder="Ваше имя"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="auth-form__error">{errors.name}</span>}
          </div>

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
              placeholder="Минимум 6 символов"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="auth-form__error">{errors.password}</span>}
          </div>

          <div className="auth-form__group">
            <label className="auth-form__label">Подтвердите пароль</label>
            <input
              type="password"
              name="confirmPassword"
              className={`auth-form__input ${errors.confirmPassword ? 'auth-form__input--error' : ''}`}
              placeholder="Повторите пароль"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="auth-form__error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth-form__submit">
            Зарегистрироваться
          </button>
        </form>

        <div className="auth-card__footer">
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
