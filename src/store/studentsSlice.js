import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  students: [
    { id: 1, name: 'Иван Петров', age: 20, course: 'React' },
    { id: 2, name: 'Мария Сидорова', age: 22, course: 'JavaScript' },
    { id: 3, name: 'Алексей Козлов', age: 21, course: 'Redux' },
    { id: 4, name: 'Елена Новикова', age: 19, course: 'TypeScript' },
    { id: 5, name: 'Дмитрий Волков', age: 23, course: 'Node.js' },
  ]
}

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload)
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload)
    }
  }
})

export const { addStudent, removeStudent } = studentsSlice.actions
export default studentsSlice.reducer
