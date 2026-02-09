import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Функция задержки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Async thunk для загрузки преподавателей
export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { rejectWithValue }) => {
    try {
      // Задержка 1 секунда
      await delay(1000)

      const response = await fetch('/data/teachers.json')
      if (!response.ok) {
        throw new Error('Ошибка загрузки преподавателей')
      }
      const data = await response.json()
      return data.teachers
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  teachers: [],
  loading: false,
  error: null
}

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false
        state.teachers = action.payload
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default teachersSlice.reducer
