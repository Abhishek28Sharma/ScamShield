import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import LottieView from 'lottie-react-native'
import EmergencyButton from '../components/EmergencyButton'

export default function ProtectScreen() {
  const [link, setLink] = useState('')

  const tips = {
    dos: [
      "Check sender's email address",
      'Look for HTTPS in website URLs',
      'Enable Two-Factor Authentication',
    ],
    donts: [
      'Never share OTPs or passwords',
      "Don't click suspicious links",
      'Avoid public WiFi for banking',
    ],
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LottieView
          source={require('../../assets/animations/lock.json')}
          autoPlay
          loop
          style={styles.lockAnimation}
        />
        <Text style={styles.title}>Protection Guide</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safe Link Checker</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste suspicious link here"
          value={link}
          onChangeText={setLink}
        />
        <TouchableOpacity style={styles.checkButton}>
          <Text style={styles.checkButtonText}>Verify Link</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ DOs</Text>
        {tips.dos.map((tip, index) => (
          <Text key={`do-${index}`} style={styles.tipItem}>
            • {tip}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❌ DON'Ts</Text>
        {tips.donts.map((tip, index) => (
          <Text key={`dont-${index}`} style={styles.tipItem}>
            • {tip}
          </Text>
        ))}
      </View>

      <EmergencyButton
        text="🚨 Immediate Help: Call 1930"
        onPress={() => Linking.openURL('tel:1930')}
        isPrimary
      />
    </ScrollView>
  )
}
