import React from 'react'
import { TouchableOpacity, Text, Linking } from 'react-native'
import LottieView from 'lottie-react-native'

export default function EmergencyButton({ text, onPress, isPrimary = false }) {
  return (
    <TouchableOpacity
      style={[styles.button, isPrimary && styles.primaryButton]}
      onPress={onPress}
    >
      {isPrimary && (
        <LottieView
          source={require('../assets/animations/warning.json')}
          autoPlay
          loop
          style={styles.buttonIcon}
        />
      )}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}
