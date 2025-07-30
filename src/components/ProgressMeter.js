import React from 'react'
import { View, Text, Animated } from 'react-native'
import LottieView from 'lottie-react-native'

export default function ProgressMeter({ progress }) {
  const widthInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.progressContainer}>
      <LottieView
        source={require('../assets/animations/progress.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.progressBackground}>
        <Animated.View
          style={[styles.progressFill, { width: widthInterpolate }]}
        />
      </View>
      <Text style={styles.progressText}>You're 70% protected!</Text>
    </View>
  )
}
