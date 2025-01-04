import { createSlice } from '@reduxjs/toolkit'

// Load saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en'

const initialState = {
  language: savedLanguage, // Use saved language as default
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
      // Save language in localStorage
      localStorage.setItem('language', action.payload)
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer
