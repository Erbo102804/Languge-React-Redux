import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllNews } from '../../services/newsService'

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try { return await getAllNews() }
    catch (e) { return rejectWithValue(e.message) }
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState: { news: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchNews.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchNews.fulfilled, (s, a) => { s.loading = false; s.news = a.payload })
      .addCase(fetchNews.rejected, (s, a) => { s.loading = false; s.error = a.payload })
  }
})

export default newsSlice.reducer
