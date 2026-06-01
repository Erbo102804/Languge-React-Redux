import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    coursesSearch: '',
    coursesLevel: 'all'
  },
  reducers: {
    setCoursesSearch: (state, action) => { state.coursesSearch = action.payload },
    setCoursesLevel: (state, action) => { state.coursesLevel = action.payload },
    resetCoursesFilters: (state) => {
      state.coursesSearch = ''
      state.coursesLevel = 'all'
    }
  }
})

export const { setCoursesSearch, setCoursesLevel, resetCoursesFilters } = uiSlice.actions

export const selectFilteredCourses = (state) => {
  const { coursesSearch, coursesLevel } = state.ui
  const q = coursesSearch.trim().toLowerCase()
  return state.courses.courses.filter(c => {
    const matchesQ = !q
      || c.title.toLowerCase().includes(q)
      || c.description.toLowerCase().includes(q)
      || c.instructor.toLowerCase().includes(q)
    const matchesLevel = coursesLevel === 'all' || c.level === coursesLevel
    return matchesQ && matchesLevel
  })
}

export default uiSlice.reducer
