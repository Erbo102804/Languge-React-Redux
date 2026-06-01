import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './studentsSlice'
import coursesReducer from './coursesSlice'
import newsReducer from './newsSlice'
import teachersReducer from './teachersSlice'
import authReducer from './authSlice'
import enrollmentsReducer from './enrollmentsSlice'
import notificationsReducer from './notificationsSlice'
import chatReducer from './chatSlice'

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer,
    news: newsReducer,
    teachers: teachersReducer,
    auth: authReducer,
    enrollments: enrollmentsReducer,
    notifications: notificationsReducer,
    chat: chatReducer
  }
})
