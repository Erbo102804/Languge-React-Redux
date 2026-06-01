import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import coursesReducer from './slices/coursesSlice'
import studentsReducer from './slices/studentsSlice'
import teachersReducer from './slices/teachersSlice'
import newsReducer from './slices/newsSlice'
import enrollmentsReducer from './slices/enrollmentsSlice'
import notificationsReducer from './slices/notificationsSlice'
import chatReducer from './slices/chatSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    students: studentsReducer,
    teachers: teachersReducer,
    news: newsReducer,
    enrollments: enrollmentsReducer,
    notifications: notificationsReducer,
    chat: chatReducer,
    ui: uiReducer
  }
})
