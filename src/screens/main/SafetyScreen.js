import React, { useRef, useEffect } from 'react'
import { View, Text, Animated } from 'react-native'
import LottieView from 'lottie-react-native'
import ProgressMeter from '../components/ProgressMeter'

export default function SafetyScreen() {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.7,
      duration: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Safety Score</Text>

      <ProgressMeter progress={progress} />

      <View style={styles.badgesContainer}>
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <LottieView
          source={require('../../assets/animations/badge.json')}
          autoPlay
          loop
          style={styles.badgeAnimation}
        />
        <Text>Phishing Detective</Text>
      </View>
    </View>
  )
}
