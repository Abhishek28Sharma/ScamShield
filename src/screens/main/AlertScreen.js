import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'
import AlertCard from '../components/AlertCard'
import EmergencyButton from '../components/EmergencyButton'

const alerts = [
  {
    id: 1,
    title: 'Fake Job Scam Alert!',
    description: 'Scammers offering fake work-from-home jobs',
    severity: 'high',
  },
  {
    id: 2,
    title: 'Bank SMS Fraud',
    description: 'Fake messages about account suspension',
    severity: 'critical',
  },
]

export default function AlertsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LottieView
          source={require('../../assets/animations/warning.json')}
          autoPlay
          loop
          style={styles.warningAnimation}
        />
        <Text style={styles.title}>Current Scam Alerts</Text>
      </View>

      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          title={alert.title}
          description={alert.description}
          severity={alert.severity}
        />
      ))}

      <EmergencyButton
        text="🚨 Report Scam"
        onPress={() => Linking.openURL('https://cybercrime.gov.in')}
      />

      <EmergencyButton
        text="📞 Call 1930 (Cyber Crime)"
        onPress={() => Linking.openURL('tel:1930')}
        isPrimary
      />
    </ScrollView>
  )
}
