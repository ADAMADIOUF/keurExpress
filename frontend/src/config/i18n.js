import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next.
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          about: 'About',
          property: 'Property',
          partners: 'Partners',
          agents: 'Agents',
          contact: 'Contact Us',
        },
      },
      fr: {
        translation: {
          home: 'Accueil',
          about: 'À propos',
          property: 'Propriété',
          partners: 'Partenaires',
          agents: 'Agents',
          contact: 'Contactez-nous',
        },
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  })

export default i18n
