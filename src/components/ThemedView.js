// src/components/ThemedView.js
import { View } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'

const ThemedView = ({ children, style }) => {
  const { theme } = useTheme()
  return (
    <View style={[{ backgroundColor: theme.colors.background }, style]}>
      {children}
    </View>
  )
}

export default ThemedView
