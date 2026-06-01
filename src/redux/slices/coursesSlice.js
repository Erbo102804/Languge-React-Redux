import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAllCourses,
  getCourseById,
  createCourseRemote,
  updateCourseRemote,
  deleteCourseRemote
} from '../../services/coursesService'

// READ: список
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCourses()
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

// READ: один
export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { courses } = getState().courses
      const cached = courses.find(c => c.id === Number(id))
      if (cached) return cached
      return await getCourseById(id)
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

// CREATE — POST на JSONPlaceholder
export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (course, { getState, rejectWithValue }) => {
    try {
      const { courses } = getState().courses
      const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1
      const draft = { ...course, id: newId }
      return await createCourseRemote(draft)
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

// UPDATE — PUT на JSONPlaceholder
export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async (course, { rejectWithValue }) => {
    try {
      return await updateCourseRemote(course)
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

// DELETE — DELETE на JSONPlaceholder
export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteCourseRemote(id)
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  mutating: false,
  error: null
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCurrentCourse: (state) => { state.currentCourse = null },
    clearError: (state) => { state.error = null }
  },
  extraReducers: (b) => {
    b
      .addCase(fetchCourses.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchCourses.fulfilled, (s, a) => { s.loading = false; s.courses = a.payload })
      .addCase(fetchCourses.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      .addCase(fetchCourseById.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchCourseById.fulfilled, (s, a) => { s.loading = false; s.currentCourse = a.payload })
      .addCase(fetchCourseById.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      .addCase(createCourse.pending, (s) => { s.mutating = true })
      .addCase(createCourse.fulfilled, (s, a) => {
        s.mutating = false
        s.courses.push(a.payload)
      })
      .addCase(createCourse.rejected, (s, a) => { s.mutating = false; s.error = a.payload })

      .addCase(updateCourse.pending, (s) => { s.mutating = true })
      .addCase(updateCourse.fulfilled, (s, a) => {
        s.mutating = false
        const idx = s.courses.findIndex(c => c.id === a.payload.id)
        if (idx !== -1) s.courses[idx] = a.payload
        if (s.currentCourse?.id === a.payload.id) s.currentCourse = a.payload
      })
      .addCase(updateCourse.rejected, (s, a) => { s.mutating = false; s.error = a.payload })

      .addCase(deleteCourse.pending, (s) => { s.mutating = true })
      .addCase(deleteCourse.fulfilled, (s, a) => {
        s.mutating = false
        s.courses = s.courses.filter(c => c.id !== a.payload)
        if (s.currentCourse?.id === a.payload) s.currentCourse = null
      })
      .addCase(deleteCourse.rejected, (s, a) => { s.mutating = false; s.error = a.payload })
  }
})

export const { clearCurrentCourse, clearError } = coursesSlice.actions
export default coursesSlice.reducer
