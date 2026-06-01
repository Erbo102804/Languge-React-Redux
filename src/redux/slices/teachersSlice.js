import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTeachers } from '../../services/teachersService'

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { rejectWithValue }) => {
    try { return await getAllTeachers() }
    catch (e) { return rejectWithValue(e.message) }
  }
)

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: { teachers: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchTeachers.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchTeachers.fulfilled, (s, a) => { s.loading = false; s.teachers = a.payload })
      .addCase(fetchTeachers.rejected, (s, a) => { s.loading = false; s.error = a.payload })
  }
})

export default teachersSlice.reducer
