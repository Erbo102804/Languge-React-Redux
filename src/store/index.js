import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './studentsSlice'
import coursesReducer from './coursesSlice'
import newsReducer from './newsSlice'
import teachersReducer from './teachersSlice'

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer,
    news: newsReducer,
    teachers: teachersReducer
  }
})
