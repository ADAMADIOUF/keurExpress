import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './locales/en/translation.json'
import frTranslations from './locales/fr/translation.json'

// Retrieve the saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en'

i18n.use(initReactI18next).init({
  backend: {
    loadPath: '/locales/{{lng}}/translation.json', // This path should point to your static file location
  },
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
  lng: savedLanguage, // Use saved language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

i18n.on('languageChanged', (lng) => {
  // Save the language to localStorage whenever it changes
  localStorage.setItem('language', lng)
})

export default i18n
