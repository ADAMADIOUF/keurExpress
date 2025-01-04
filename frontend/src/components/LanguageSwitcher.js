import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../slices/lanuageSlice'
import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const language = useSelector((state) => state.language.language)

  useEffect(() => {
    // Sync the language with i18n and localStorage when it changes
    i18n.changeLanguage(language)
  }, [language, i18n])

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value
    dispatch(setLanguage(selectedLanguage)) // Update Redux and localStorage
  }

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value='en'>English 🇺🇸</option>
      <option value='fr'>Français 🇫🇷</option>
    </select>
  )
}

export default LanguageSwitcher
