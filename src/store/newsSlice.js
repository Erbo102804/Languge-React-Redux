import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Функция задержки
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Async thunk для загрузки новостей
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      // Задержка 1.2 секунды
      await delay(1200)

      const response = await fetch('/data/news.json')
      if (!response.ok) {
        throw new Error('Ошибка загрузки новостей')
      }
      const data = await response.json()
      return data.news
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  news: [],
  loading: false,
  error: null
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false
        state.news = action.payload
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default newsSlice.reducer
