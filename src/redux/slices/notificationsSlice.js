import { createSlice } from '@reduxjs/toolkit'

let nextId = 1

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { items: [] },
  reducers: {
    pushNotification: {
      reducer: (state, action) => {
        state.items.push(action.payload)
      },
      prepare: ({ text, type = 'success' }) => ({
        payload: { id: nextId++, text, type }
      })
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    }
  }
})

export const { pushNotification, removeNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
