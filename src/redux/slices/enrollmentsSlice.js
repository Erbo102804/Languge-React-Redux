import { createSlice } from '@reduxjs/toolkit'
import { getScheduleSlot } from '../../utils/schedule'

const STORAGE_KEY = 'enrollments'

const loadFromStorage = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

const saveToStorage = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: { items: loadFromStorage() },
  reducers: {
    enroll: (state, action) => {
      const { userId, course } = action.payload
      const already = state.items.find(
        i => i.userId === userId && i.courseId === course.id
      )
      if (already) return
      const slot = getScheduleSlot(course.id)
      state.items.push({
        id: Date.now(),
        userId,
        courseId: course.id,
        courseTitle: course.title,
        instructor: course.instructor,
        image: course.image,
        level: course.level,
        duration: course.duration,
        price: course.price,
        day: slot.day,
        time: slot.time,
        enrolledAt: new Date().toISOString()
      })
      saveToStorage(state.items)
    },
    unenroll: (state, action) => {
      const { userId, courseId } = action.payload
      state.items = state.items.filter(
        i => !(i.userId === userId && i.courseId === courseId)
      )
      saveToStorage(state.items)
    },
    clearUserEnrollments: (state, action) => {
      const userId = action.payload
      state.items = state.items.filter(i => i.userId !== userId)
      saveToStorage(state.items)
    }
  }
})

export const { enroll, unenroll, clearUserEnrollments } = enrollmentsSlice.actions

export const selectUserEnrollments = (userId) => (state) =>
  state.enrollments.items.filter(i => i.userId === userId)

export const selectIsEnrolled = (userId, courseId) => (state) =>
  !!state.enrollments.items.find(
    i => i.userId === userId && i.courseId === Number(courseId)
  )

export default enrollmentsSlice.reducer
