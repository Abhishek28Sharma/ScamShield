import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, BackHandler } from 'react-native'
import LottieView from 'lottie-react-native'
import QuizComponent from '../../components/QuizComponent'
import ConfettiCannon from 'react-native-confetti-cannon' // Missing import
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
const LearnScreen = () => {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [navigation])

  return (
    <ScrollView style={styles.container}>
      {/* Animated Header */}
      <View style={styles.header}>
        <LottieView
          source={require('../../assets/animations/shield.json')}
          autoPlay
          loop
          style={styles.shieldAnimation}
        />
        <Text style={styles.title}>Stay Safe from Phishing Scams!</Text>
      </View>

      {/* Phishing Explanation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What is Phishing?</Text>
        <LottieView
          source={require('../../assets/animations/phishing.json')}
          autoPlay
          loop
          style={styles.phishingAnimation}
        />
        <Text style={styles.description}>
          Fraudsters pretend to be banks or companies to steal your passwords
          and money!
        </Text>
      </View>

      {/* Interactive Quiz */}
      <QuizComponent onComplete={() => setQuizCompleted(true)} />

      {quizCompleted && (
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  shieldAnimation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2c3e50',
  },
  phishingAnimation: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
  },
})

export default LearnScreen
