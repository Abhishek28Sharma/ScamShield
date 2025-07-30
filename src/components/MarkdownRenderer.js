import React from 'react'
import { Text } from 'react-native'
// import { useTheme } from '../context/ThemeContext'

const MarkdownRenderer = ({ text }) => {
  const { theme } = useTheme()

  // Simple markdown parsing for React Native
  const renderMarkdown = (content) => {
    const parts = content.split(/(\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_|`.*?`)/)

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={i} style={{ fontWeight: 'bold' }}>
            {part.slice(2, -2)}
          </Text>
        )
      } else if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <Text key={i} style={{ fontStyle: 'italic' }}>
            {part.slice(1, -1)}
          </Text>
        )
      } else if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <Text
            key={i}
            style={{
              fontFamily: 'monospace',
              backgroundColor: theme.colors.border,
            }}
          >
            {part.slice(1, -1)}
          </Text>
        )
      } else {
        return <Text key={i}>{part}</Text>
      }
    })
  }

  return (
    <Text style={{ color: theme.colors.text }}>{renderMarkdown(text)}</Text>
  )
}

export default MarkdownRenderer
