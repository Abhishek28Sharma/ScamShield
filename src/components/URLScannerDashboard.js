import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

const URLScannerDashboard = () => {
  const [url, setUrl] = useState('')
  const [scanHistory, setScanHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentResult, setRecentResult] = useState(null)
  const [error, setError] = useState(null)

  // Backend server endpoint (update with your actual URL)
  const API_BASE_URL = 'https://362c26947500.ngrok-free.app'

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

  return (
    <View style={styles.container}>
      {/* Scan Input Section */}
      <View style={styles.scanContainer}>
        <Text style={styles.sectionTitle}>URL Security Scanner</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="https://example.com"
            placeholderTextColor="#999"
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
              <Ionicons name="scan" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={18} color="#FF5252" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>

      {/* Recent Result Section */}
      {recentResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.sectionTitle}>Scan Result</Text>
          <View
            style={[
              styles.resultCard,
              recentResult.malicious > 0 ? styles.dangerCard : styles.safeCard,
            ]}
          >
            <View style={styles.resultHeader}>
              <Ionicons
                name={
                  recentResult.malicious > 0 ? 'warning' : 'checkmark-circle'
                }
                size={28}
                color={recentResult.malicious > 0 ? '#FF5252' : '#4CAF50'}
              />
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultUrl} numberOfLines={1}>
                  {recentResult.url}
                </Text>
                <Text style={styles.resultStatus}>
                  {recentResult.malicious > 0 ? 'Unsafe' : 'Safe'} • Threat:{' '}
                  {getThreatLevel(recentResult.malicious)}
                </Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {recentResult.malicious || 0}
                </Text>
                <Text style={styles.statLabel}>Malicious</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {recentResult.suspicious || 0}
                </Text>
                <Text style={styles.statLabel}>Suspicious</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {recentResult.totalScans || 0}
                </Text>
                <Text style={styles.statLabel}>Total Scans</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Scan History Section */}
      {scanHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {scanHistory.map((scan, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.historyCard,
                  scan.malicious > 0
                    ? styles.historyDanger
                    : styles.historySafe,
                ]}
                onPress={() => setRecentResult(scan)}
              >
                <Text style={styles.historyUrl} numberOfLines={1}>
                  {scan.url.replace(/^https?:\/\//, '')}
                </Text>
                <View style={styles.historyStats}>
                  <Ionicons
                    name={scan.malicious > 0 ? 'warning' : 'checkmark'}
                    size={16}
                    color={scan.malicious > 0 ? '#FF5252' : '#4CAF50'}
                  />
                  <Text style={styles.historyStatText}>
                    {scan.malicious} threats
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scanContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
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
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  scanButton: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: '#4285F4',
    borderRadius: 8,
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
  },
  errorText: {
    marginLeft: 5,
    color: '#D32F2F',
    fontSize: 14,
  },
  resultContainer: {
    marginBottom: 25,
  },
  resultCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  safeCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  dangerCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF5252',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  resultUrl: {
    fontSize: 14,
    color: '#555',
  },
  resultStatus: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    minWidth: 80,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  historyContainer: {
    marginBottom: 20,
  },
  historyCard: {
    width: 120,
    padding: 12,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  historySafe: {
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  historyDanger: {
    borderLeftWidth: 3,
    borderLeftColor: '#FF5252',
  },
  historyUrl: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  historyStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyStatText: {
    fontSize: 12,
    marginLeft: 5,
    color: '#555',
  },
})

export default URLScannerDashboard
