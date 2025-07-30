import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        settings: 'Settings',
        profile: 'Profile',
        editProfile: 'Edit Profile',
        changePassword: 'Change Password',
        preferences: 'Preferences',
        darkMode: 'Dark Mode',
        notifications: 'Notifications',
        language: 'Language',
        account: 'Account',
        logout: 'Logout',
      },
    },
    hi: {
      translation: {
        settings: 'सेटिंग्स',
        profile: 'प्रोफ़ाइल',
        editProfile: 'प्रोफ़ाइल संपादित करें',
        changePassword: 'पासवर्ड बदलें',
        preferences: 'प्राथमिकताएँ',
        darkMode: 'डार्क मोड',
        notifications: 'सूचनाएं',
        language: 'भाषा',
        account: 'खाता',
        logout: 'लॉग आउट',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
