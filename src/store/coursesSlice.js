import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Функция задержки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Async thunk для загрузки всех курсов
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      // Задержка 1.5 секунды для демонстрации загрузки
      await delay(1500)

      const response = await fetch('/data/courses.json')
      if (!response.ok) {
        throw new Error('Ошибка загрузки курсов')
      }
      const data = await response.json()
      return data.courses
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk для загрузки одного курса по ID
export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id, { rejectWithValue }) => {
    try {
      // Задержка 1 секунда
      await delay(1000)

      const response = await fetch('/data/courses.json')
      if (!response.ok) {
        throw new Error('Ошибка загрузки курса')
      }
      const data = await response.json()
      const course = data.courses.find(c => c.id === Number(id))

      if (!course) {
        throw new Error('Курс не найден')
      }

      return course
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch single course
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false
        state.currentCourse = action.payload
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearCurrentCourse } = coursesSlice.actions
export default coursesSlice.reducer
