// context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const themeColors =
    theme === 'light'
      ? {
          background: '#ffffff',
          cardBackground: '#f8f9fa',
          text: '#212529',
          textSecondary: '#6c757d',
          primary: '#007bff',
          primaryLight: '#cce5ff',
          border: '#dee2e6',
        }
      : {
          background: '#121212',
          cardBackground: '#1e1e1e',
          text: '#f8f9fa',
          textSecondary: '#adb5bd',
          primary: '#90caf9',
          primaryLight: '#1e3a8a',
          border: '#343a40',
        }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
