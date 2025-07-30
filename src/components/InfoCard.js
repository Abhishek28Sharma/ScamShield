// import { View, Text, StyleSheet } from 'react-native'

// export default function InfoCard({ letter, title, content }) {
//   return (
//     <View style={styles.card}>
//       <View style={styles.letterContainer}>
//         <Text style={styles.letter}>{letter}</Text>
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.text}>{content}</Text>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     flexDirection: 'row',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   letterContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#0066CC',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   letter: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   content: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#333',
//   },
//   text: {
//     fontSize: 15,
//     color: '#555',
//     lineHeight: 22,
//   },
// })
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'

const InfoCard = ({ letter, title, content }) => {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  return (
    <View style={styles.card}>
      <View style={styles.letterContainer}>
        <Text style={styles.letter}>{letter}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </View>
  )
}

const getStyles = (colors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    letterContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    letter: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 5,
    },
    contentText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
  })

export default InfoCard
