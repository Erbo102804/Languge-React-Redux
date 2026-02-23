import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      await delay(1500)
      const response = await fetch('/data/courses.json')
      if (!response.ok) throw new Error('Ошибка загрузки курсов')
      const data = await response.json()
      return data.courses
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id, { getState, rejectWithValue }) => {
    try {
      await delay(1000)
      // Сначала ищем в уже загруженных
      const { courses } = getState().courses
      if (courses.length > 0) {
        const found = courses.find(c => c.id === Number(id))
        if (found) return found
      }
      const response = await fetch('/data/courses.json')
      if (!response.ok) throw new Error('Ошибка загрузки курса')
      const data = await response.json()
      const course = data.courses.find(c => c.id === Number(id))
      if (!course) throw new Error('Курс не найден')
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
    // CREATE
    addCourse: (state, action) => {
      const newId = state.courses.length > 0
        ? Math.max(...state.courses.map(c => c.id)) + 1
        : 1
      state.courses.push({ ...action.payload, id: newId })
    },
    // UPDATE
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.courses[index] = action.payload
        if (state.currentCourse?.id === action.payload.id) {
          state.currentCourse = action.payload
        }
      }
    },
    // DELETE
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(c => c.id !== action.payload)
      if (state.currentCourse?.id === action.payload) {
        state.currentCourse = null
      }
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null
    }
  },
  extraReducers: (builder) => {
    builder
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

export const { addCourse, updateCourse, deleteCourse, clearCurrentCourse } = coursesSlice.actions
export default coursesSlice.reducer
