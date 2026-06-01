import { createSlice } from '@reduxjs/toolkit'

// Получаем пользователя из localStorage при загрузке
const savedUser = localStorage.getItem('user')

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload

      // Проверяем есть ли зарегистрированный пользователь
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === email && u.password === password)

      if (user) {
        state.user = { id: user.id, name: user.name, email: user.email }
        state.isAuthenticated = true
        state.error = null
        localStorage.setItem('user', JSON.stringify(state.user))
      } else {
        state.error = 'Неверный email или пароль'
      }
    },

    register: (state, action) => {
      const { name, email, password } = action.payload

      // Получаем существующих пользователей
      const users = JSON.parse(localStorage.getItem('users') || '[]')

      // Проверяем, существует ли email
      if (users.find(u => u.email === email)) {
        state.error = 'Пользователь с таким email уже существует'
        return
      }

      // Создаём нового пользователя
      const newUser = {
        id: Date.now(),
        name,
        email,
        password
      }

      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Автоматически входим
      state.user = { id: newUser.id, name: newUser.name, email: newUser.email }
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('user', JSON.stringify(state.user))
    },

    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('user')
    },

    clearError: (state) => {
      state.error = null
    }
  }
})

export const { login, register, logout, clearError } = authSlice.actions
export default authSlice.reducer
