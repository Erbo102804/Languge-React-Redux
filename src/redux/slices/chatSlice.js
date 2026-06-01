import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'chat_messages'

const loadFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

const saveToStorage = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

let nextId = Date.now()

const initialState = {
  messages: loadFromStorage()
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendUserMessage: {
      reducer: (state, action) => {
        state.messages.push(action.payload)
        saveToStorage(state.messages)
      },
      prepare: ({ userId, courseId, teacher, text }) => ({
        payload: {
          id: nextId++,
          userId,
          courseId,
          teacher,
          role: 'user',
          text,
          ts: Date.now()
        }
      })
    },
    sendTeacherReply: {
      reducer: (state, action) => {
        state.messages.push(action.payload)
        saveToStorage(state.messages)
      },
      prepare: ({ userId, courseId, teacher, text }) => ({
        payload: {
          id: nextId++,
          userId,
          courseId,
          teacher,
          role: 'teacher',
          text,
          ts: Date.now()
        }
      })
    },
    clearChat: (state, action) => {
      const { userId, courseId } = action.payload
      state.messages = state.messages.filter(
        m => !(m.userId === userId && m.courseId === courseId)
      )
      saveToStorage(state.messages)
    }
  }
})

export const { sendUserMessage, sendTeacherReply, clearChat } = chatSlice.actions

export const selectChat = (userId, courseId) => (state) =>
  state.chat.messages.filter(
    m => m.userId === userId && m.courseId === Number(courseId)
  )

export default chatSlice.reducer
