import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const questions = [
  {
    question: 'Is this SMS from your bank real?',
    options: [
      { text: "Yes, it's real", isCorrect: false },
      { text: "No, it's a scam!", isCorrect: true },
    ],
    example: 'URGENT: Your account is locked! Click here: bit.ly/fake-bank',
  },
]

const QuizComponent = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete()
    }
  }

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.quizTitle}>Can you spot a fake message?</Text>
      <Text style={styles.quizQuestion}>
        {questions[currentQuestion].question}
      </Text>
      <Text style={styles.quizExample}>
        "{questions[currentQuestion].example}"
      </Text>

      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              option.isCorrect ? styles.correctOption : styles.incorrectOption,
            ]}
            onPress={() => handleAnswer(option.isCorrect)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  quizContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 20,
    marginVertical: 15,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
    textAlign: 'center',
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  quizExample: {
    fontFamily: 'monospace',
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: '#495057',
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  correctOption: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  incorrectOption: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#212529',
  },
})

export default QuizComponent
