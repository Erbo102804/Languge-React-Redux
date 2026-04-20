import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  likes: {},      // { [courseId]: boolean }
  favorites: [],  // [courseId, ...]
  ratings: {},    // { [courseId]: number[] }
}

const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const id = action.payload
      state.likes[id] = !state.likes[id]
    },
    toggleFavorite: (state, action) => {
      const id = action.payload
      const idx = state.favorites.indexOf(id)
      if (idx === -1) {
        state.favorites.push(id)
      } else {
        state.favorites.splice(idx, 1)
      }
    },
    addRating: (state, action) => {
      const { courseId, rating } = action.payload
      if (!state.ratings[courseId]) {
        state.ratings[courseId] = []
      }
      state.ratings[courseId].push(rating)
    },
  },
})

export const { toggleLike, toggleFavorite, addRating } = interactionsSlice.actions

export const selectIsLiked = (courseId) => (state) => !!state.interactions.likes[courseId]
export const selectIsFavorite = (courseId) => (state) => state.interactions.favorites.includes(courseId)
export const selectAverageRating = (courseId) => (state) => {
  const list = state.interactions.ratings[courseId]
  if (!list || list.length === 0) return null
  return (list.reduce((a, b) => a + b, 0) / list.length).toFixed(1)
}
export const selectUserRating = (courseId) => (state) => {
  const list = state.interactions.ratings[courseId]
  return list && list.length > 0 ? list[list.length - 1] : 0
}

export default interactionsSlice.reducer
