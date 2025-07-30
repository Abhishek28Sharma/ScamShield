import React from 'react'
import { View, Text, Animated } from 'react-native'

export default function AlertCard({ title, description, severity }) {
  const pulseAnim = new Animated.Value(1)

  useEffect(() => {
    if (severity === 'critical') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start()
    }
  }, [])

  return (
    <Animated.View
      style={[
        styles.card,
        severity === 'critical' && styles.criticalCard,
        { transform: [{ scale: pulseAnim }] },
      ]}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{description}</Text>
    </Animated.View>
  )
}
