// import React, { useState, useEffect } from 'react'
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
//   Linking,
//   TextInput,
//   Dimensions,
// } from 'react-native'
// import { MaterialIcons, Ionicons } from '@expo/vector-icons'
// import InfoCard from '../../components/InfoCard'
// import { useNavigation } from '@react-navigation/native'
// import { useTheme } from '../../contexts/ThemeContext'
// import LottieView from 'lottie-react-native'

// export default function Dashboard() {
//   const navigation = useNavigation()
//   const { colors } = useTheme()
//   const styles = getStyles(colors)
//   const [stats, setStats] = useState({
//     protectedToday: 1243,
//     activeScams: 28,
//   })
//   const [currentAlert, setCurrentAlert] = useState(
//     'Fake bank SMS scam detected!'
//   )
//   const pulseAnim = new Animated.Value(1)

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1.1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start()
//   }, [])

//   const alerts = [
//     {
//       id: 1,
//       title: 'Fake Job Scam Alert!',
//       description: 'Scammers offering fake work-from-home jobs',
//       severity: 'high',
//     },
//     {
//       id: 2,
//       title: 'Bank SMS Fraud',
//       description: 'Fake messages about account suspension',
//       severity: 'critical',
//     },
//   ]

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {/* Header */}
//       <View
//         style={[
//           styles.headerContainer,
//           { backgroundColor: colors.cardBackground },
//         ]}
//       >
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <LottieView
//             source={require('../../assets/animations/shield.json')}
//             autoPlay
//             loop
//             style={styles.shieldAnimation}
//           />
//           <Text style={[styles.header, { color: colors.text }]}>
//             ScamShield
//           </Text>
//         </View>
//       </View>

//       {/* Stats Bar */}
//       <Animated.View
//         style={[
//           styles.statsBar,
//           {
//             backgroundColor: colors.cardBackground,
//             transform: [{ scale: pulseAnim }],
//           },
//         ]}
//       >
//         <View style={styles.statItem}>
//           <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
//           <Text style={[styles.statText, { color: colors.text }]}>
//             Protected: {stats.protectedToday}
//           </Text>
//         </View>
//         <View style={styles.statItem}>
//           <Ionicons name="warning" size={20} color="#F44336" />
//           <Text style={[styles.statText, { color: colors.text }]}>
//             Active Scams: {stats.activeScams}
//           </Text>
//         </View>
//       </Animated.View>

//       {/* Main Content */}
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Alert Bar */}
//         <TouchableOpacity
//           style={[
//             styles.alertBar,
//             {
//               backgroundColor: colors.notificationBackground,
//               borderLeftColor: colors.notificationAccent,
//             },
//           ]}
//         >
//           <Ionicons
//             name="alert-circle"
//             size={20}
//             color={colors.notificationAccent}
//           />
//           <Text style={[styles.alertText, { color: colors.text }]}>
//             {currentAlert}
//           </Text>
//           <MaterialIcons
//             name="arrow-forward-ios"
//             size={16}
//             color={colors.text}
//           />
//         </TouchableOpacity>

//         {/* Alerts Section */}
//         <View
//           style={[styles.section, { backgroundColor: colors.cardBackground }]}
//         >
//           <Text style={[styles.sectionTitle, { color: colors.text }]}>
//             Recent Scam Alerts
//           </Text>
//           {alerts.map((alert) => (
//             <View
//               key={alert.id}
//               style={[
//                 styles.alertCard,
//                 {
//                   backgroundColor:
//                     alert.severity === 'critical'
//                       ? colors.criticalAlertBackground
//                       : colors.warningAlertBackground,
//                   borderLeftColor:
//                     alert.severity === 'critical'
//                       ? colors.criticalAlertAccent
//                       : colors.warningAlertAccent,
//                 },
//               ]}
//             >
//               <Text style={[styles.alertCardTitle, { color: colors.text }]}>
//                 {alert.title}
//               </Text>
//               <Text
//                 style={[styles.alertCardText, { color: colors.textSecondary }]}
//               >
//                 {alert.description}
//               </Text>
//             </View>
//           ))}
//           <TouchableOpacity style={styles.viewAllButton}>
//             <Text style={[styles.viewAllText, { color: colors.primary }]}>
//               View All Alerts
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Protection Section */}

//         {/* Safety Section */}
//         <View
//           style={[styles.section, { backgroundColor: colors.cardBackground }]}
//         >
//           <Text style={[styles.sectionTitle, { color: colors.text }]}>
//             Your Safety Status
//           </Text>
//           <View style={styles.progressContainer}>
//             <Text style={[styles.progressText, { color: colors.text }]}>
//               You're 100% protected
//             </Text>
//             <View
//               style={[
//                 styles.progressBar,
//                 { backgroundColor: colors.progressBarBackground },
//               ]}
//             >
//               <View
//                 style={[
//                   styles.progressFill,
//                   { backgroundColor: colors.primary },
//                 ]}
//               />
//             </View>
//           </View>

//           <View style={styles.badgesContainer}>
//             <Text style={[styles.badgesTitle, { color: colors.text }]}>
//               Your Badges
//             </Text>
//             <View style={styles.badgesRow}>
//               <View style={styles.badge}>
//                 <Ionicons name="shield-checkmark" size={30} color="#4CAF50" />
//                 <Text style={[styles.badgeText, { color: colors.text }]}>
//                   Phishing Detective
//                 </Text>
//               </View>
//               <View style={styles.badge}>
//                 <Ionicons name="lock-closed" size={30} color="#2196F3" />
//                 <Text style={[styles.badgeText, { color: colors.text }]}>
//                   Safe Clicker
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Emergency Section */}
//         <View
//           style={[styles.section, { backgroundColor: colors.cardBackground }]}
//         >
//           <Text style={[styles.sectionTitle, { color: colors.text }]}>
//             Immediate Help
//           </Text>
//           <TouchableOpacity
//             style={[
//               styles.actionButton,
//               styles.emergencyButton,
//               { backgroundColor: colors.primary },
//             ]}
//             onPress={() => Linking.openURL('tel:1930')}
//           >
//             <Text style={styles.buttonText}>🚨 Call Cyber Crime: 1930</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   )
// }

// const getStyles = (colors) => {
//   const { width } = Dimensions.get('window')

//   return StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     headerContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: 20,
//       paddingTop: 40,
//       borderBottomWidth: 1,
//       borderBottomColor: colors.border,
//     },
//     header: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       marginLeft: 10,
//     },
//     shieldAnimation: {
//       width: 40,
//       height: 40,
//     },
//     statsBar: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       padding: 15,
//       marginHorizontal: 20,
//       marginTop: 10,
//       borderRadius: 10,
//       elevation: 2,
//     },
//     statItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     statText: {
//       marginLeft: 8,
//     },
//     alertBar: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: 15,
//       marginBottom: 20,
//       borderRadius: 10,
//       borderLeftWidth: 5,
//     },
//     alertText: {
//       flex: 1,
//       marginLeft: 10,
//     },
//     scrollContent: {
//       padding: 20,
//       paddingBottom: 30,
//     },
//     section: {
//       marginBottom: 30,
//       borderRadius: 10,
//       padding: 15,
//     },
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: '600',
//       marginBottom: 15,
//     },
//     tipsContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 20,
//     },
//     actionButton: {
//       flexDirection: 'row',
//       padding: 15,
//       borderRadius: 10,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginTop: 10,
//     },
//     emergencyButton: {},
//     buttonText: {
//       color: 'white',
//       fontWeight: 'bold',
//       marginRight: 10,
//     },
//     // Alerts Screen Styles
//     alertCard: {
//       padding: 15,
//       borderRadius: 8,
//       marginBottom: 10,
//       borderLeftWidth: 4,
//     },
//     alertCardTitle: {
//       fontWeight: 'bold',
//       marginBottom: 5,
//     },
//     alertCardText: {},
//     viewAllButton: {
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     viewAllText: {
//       fontWeight: '500',
//     },
//     // Protect Screen Styles
//     linkCheckerContainer: {
//       marginTop: 15,
//     },
//     linkCheckerTitle: {
//       fontWeight: '600',
//       marginBottom: 10,
//     },
//     linkInputRow: {
//       flexDirection: 'row',
//     },
//     linkInput: {
//       flex: 1,
//       padding: 12,
//       borderTopLeftRadius: 8,
//       borderBottomLeftRadius: 8,
//       borderWidth: 1,
//     },
//     verifyButton: {
//       paddingHorizontal: 20,
//       justifyContent: 'center',
//       borderTopRightRadius: 8,
//       borderBottomRightRadius: 8,
//     },
//     verifyButtonText: {
//       color: 'white',
//       fontWeight: 'bold',
//     },
//     // Safety Screen Styles
//     progressContainer: {
//       marginBottom: 20,
//     },
//     progressText: {
//       marginBottom: 8,
//     },
//     progressBar: {
//       height: 10,
//       borderRadius: 5,
//       overflow: 'hidden',
//     },
//     progressFill: {
//       height: '100%',
//     },
//     badgesContainer: {
//       marginTop: 15,
//     },
//     badgesTitle: {
//       fontWeight: '600',
//       marginBottom: 10,
//     },
//     badgesRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//     },
//     badge: {
//       alignItems: 'center',
//       padding: 10,
//     },
//     badgeText: {
//       marginTop: 5,
//       fontSize: 12,
//       textAlign: 'center',
//     },
//   })
// }
import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../contexts/ThemeContext'
import LottieView from 'lottie-react-native'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler'

export default function Dashboard() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = getStyles(colors)
  const [stats, setStats] = useState({
    protectedToday: 1243,
    activeScams: 28,
  })
  const [currentAlert, setCurrentAlert] = useState(
    'Fake bank SMS scam detected!'
  )
  const [url, setUrl] = useState('')
  const [scanHistory, setScanHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentResult, setRecentResult] = useState(null)
  const [error, setError] = useState(null)
  const pulseAnim = new Animated.Value(1)

  // Backend server endpoint
  const API_BASE_URL = 'http://your-backend-server:3001/api'

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  const validateUrl = (inputUrl) => {
    try {
      new URL(inputUrl)
      return true
    } catch {
      return false
    }
  }

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await axios.post(`${API_BASE_URL}/scan-url`, { url })

      const result = {
        ...response.data,
        url,
        timestamp: new Date().toISOString(),
      }

      setRecentResult(result)
      setScanHistory((prev) => [result, ...prev.slice(0, 4)])
      setUrl('')
      setStats((prev) => ({
        ...prev,
        protectedToday: prev.protectedToday + 1,
      }))
    } catch (err) {
      console.error('Scan Error:', err.response?.data || err.message)
      setError(err.response?.data?.error || 'Failed to scan URL')
      Alert.alert(
        'Scan Failed',
        err.response?.data?.error || 'Could not complete scan'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getThreatLevel = (maliciousCount) => {
    if (maliciousCount > 5) return 'High'
    if (maliciousCount > 0) return 'Medium'
    return 'Low'
  }

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: colors.cardBackground },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <LottieView
            source={require('../../assets/animations/shield.json')}
            autoPlay
            loop
            style={styles.shieldAnimation}
          />
          <Text style={[styles.header, { color: colors.text }]}>
            ScamShield
          </Text>
        </View>
      </View>

      {/* Stats Bar */}
      <Animated.View
        style={[
          styles.statsBar,
          {
            backgroundColor: colors.cardBackground,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <View style={styles.statItem}>
          <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
          <Text style={[styles.statText, { color: colors.text }]}>
            Protected: {stats.protectedToday}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="warning" size={20} color="#F44336" />
          <Text style={[styles.statText, { color: colors.text }]}>
            Active Scams: {stats.activeScams}
          </Text>
        </View>
      </Animated.View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* URL Scanner Section */}
        <View
          style={[styles.section, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            URL Security Scanner
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="https://example.com"
              placeholderTextColor={colors.textSecondary}
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />

            <TouchableOpacity
              style={[styles.scanButton, isLoading && styles.disabledButton]}
              onPress={handleScan}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Ionicons name="shield-checkmark" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="warning" size={18} color="#FF5252" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {recentResult && (
            <View
              style={[
                styles.resultCard,
                recentResult.malicious > 0
                  ? styles.dangerCard
                  : styles.safeCard,
              ]}
            >
              <View style={styles.resultHeader}>
                <Ionicons
                  name={
                    recentResult.malicious > 0 ? 'warning' : 'checkmark-circle'
                  }
                  size={24}
                  color={recentResult.malicious > 0 ? '#FF5252' : '#4CAF50'}
                />
                <View style={styles.resultTextContainer}>
                  <Text
                    style={[styles.resultUrl, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {recentResult.url}
                  </Text>
                  <Text
                    style={[
                      styles.resultStatus,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Threat: {getThreatLevel(recentResult.malicious)}
                  </Text>
                </View>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {recentResult.malicious || 0}
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Malicious
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {recentResult.suspicious || 0}
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Suspicious
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Alert Bar */}
        <TouchableOpacity
          style={[
            styles.alertBar,
            {
              backgroundColor: colors.notificationBackground,
              borderLeftColor: colors.notificationAccent,
            },
          ]}
        >
          <Ionicons
            name="alert-circle"
            size={20}
            color={colors.notificationAccent}
          />
          <Text style={[styles.alertText, { color: colors.text }]}>
            {currentAlert}
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Existing sections... */}
        <View
          style={[styles.section, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Scam Alerts
          </Text>
          {alerts.map((alert) => (
            <View
              key={alert.id}
              style={[
                styles.alertCard,
                {
                  backgroundColor:
                    alert.severity === 'critical'
                      ? colors.criticalAlertBackground
                      : colors.warningAlertBackground,
                  borderLeftColor:
                    alert.severity === 'critical'
                      ? colors.criticalAlertAccent
                      : colors.warningAlertAccent,
                },
              ]}
            >
              <Text style={[styles.alertCardTitle, { color: colors.text }]}>
                {alert.title}
              </Text>
              <Text
                style={[styles.alertCardText, { color: colors.textSecondary }]}
              >
                {alert.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Emergency Section */}
        <View
          style={[styles.section, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Immediate Help
          </Text>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.emergencyButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={() => Linking.openURL('tel:1930')}
          >
            <Text style={styles.buttonText}>🚨 Call Cyber Crime: 1930</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const getStyles = (colors) => {
  const { width } = Dimensions.get('window')

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 40,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    shieldAnimation: {
      width: 40,
      height: 40,
    },
    statsBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 15,
      marginHorizontal: 20,
      marginTop: 10,
      borderRadius: 10,
      elevation: 2,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statText: {
      marginLeft: 8,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 30,
    },
    section: {
      marginBottom: 20,
      borderRadius: 10,
      padding: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 15,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    input: {
      flex: 1,
      height: 50,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      backgroundColor: colors.inputBackground,
      fontSize: 16,
    },
    scanButton: {
      width: 50,
      height: 50,
      marginLeft: 10,
      borderRadius: 10,
      backgroundColor: '#4A90E2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledButton: {
      opacity: 0.6,
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#FFEBEE',
      borderRadius: 5,
      marginTop: 5,
    },
    errorText: {
      marginLeft: 5,
      color: '#D32F2F',
      fontSize: 14,
    },
    resultCard: {
      padding: 15,
      borderRadius: 10,
      marginTop: 10,
      borderLeftWidth: 5,
    },
    safeCard: {
      backgroundColor: colors.safeBackground,
      borderLeftColor: '#4CAF50',
    },
    dangerCard: {
      backgroundColor: colors.dangerBackground,
      borderLeftColor: '#FF5252',
    },
    resultHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    resultTextContainer: {
      flex: 1,
      marginLeft: 10,
    },
    resultUrl: {
      fontSize: 14,
    },
    resultStatus: {
      fontSize: 12,
      marginTop: 3,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    statItem: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      backgroundColor: colors.statBackground,
      minWidth: 80,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: 12,
      marginTop: 5,
    },
    alertBar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      marginBottom: 20,
      borderRadius: 10,
      borderLeftWidth: 5,
    },
    alertText: {
      flex: 1,
      marginLeft: 10,
    },
    alertCard: {
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      borderLeftWidth: 4,
    },
    alertCardTitle: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    actionButton: {
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    emergencyButton: {},
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  })
}
