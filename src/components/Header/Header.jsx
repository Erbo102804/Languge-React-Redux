import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector(state => state.auth)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <NavLink to="/" className="header__logo-link">
            <span className="header__logo-icon">🎓</span>
            <span className="header__logo-text">EduHub</span>
          </NavLink>
        </div>

        <button
          className={`header__burger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'header__nav-link active' : 'header__nav-link'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  isActive ? 'header__nav-link active' : 'header__nav-link'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Студенты
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive ? 'header__nav-link active' : 'header__nav-link'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Курсы
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  isActive ? 'header__nav-link active' : 'header__nav-link'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Расписание
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'header__nav-link active' : 'header__nav-link'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                О нас
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          {isAuthenticated ? (
            <div className="header__user">
              <NavLink to="/profile" className="header__user-name">
                👤 {user?.name}
              </NavLink>
              <button className="header__btn header__btn--logout" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="header__btn header__btn--login">
                Войти
              </NavLink>
              <NavLink to="/register" className="header__btn header__btn--register">
                Регистрация
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
