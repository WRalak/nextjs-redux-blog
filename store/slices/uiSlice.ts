// store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  theme: 'light' | 'dark' | 'system'
  notifications: {
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  }[]
  modalOpen: boolean
  modalType: string | null
  modalData: any
}

const initialState: UIState = {
  theme: 'system',
  notifications: [],
  modalOpen: false,
  modalType: null,
  modalData: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },
    addNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modalOpen = true
      state.modalType = action.payload.type
      state.modalData = action.payload.data
    },
    closeModal: (state) => {
      state.modalOpen = false
      state.modalType = null
      state.modalData = null
    },
  },
})

export const {
  setTheme,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
} = uiSlice.actions

export default uiSlice.reducer