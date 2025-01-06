import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18nextHttpBackend from 'i18next-http-backend'
import i18nextLanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(i18nextHttpBackend) // Use this to load translations from your backend
  .use(i18nextLanguageDetector) // Language detector
  .use(initReactI18next) // Pass i18next instance to react-i18next
  .init({
    fallbackLng: 'en', // Default language
    debug: true,
    backend: {
      loadPath: 'http://localhost:5000/api/translate', // Set your translation API endpoint
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
  })

export default i18n
