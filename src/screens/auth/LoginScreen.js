import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../api/firebase'
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  updatePassword,
} from 'firebase/auth'
import Dashboard from '../main/Dashboard'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [strengthColor, setStrengthColor] = useState('#e74c3c')
  const [strengthText, setStrengthText] = useState('Weak')
  const [isFormValid, setIsFormValid] = useState(false)
  const [resetFlow, setResetFlow] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOtpField, setShowOtpField] = useState(false)
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false)

  const navigation = useNavigation()
  const strengthAnim = new Animated.Value(0)

  useEffect(() => {
    if (!resetFlow) {
      checkPasswordStrength(password)
      validateForm()
    }
  }, [email, password, resetFlow])

  const validateForm = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const passwordValid = password.length >= 6
    setIsFormValid(emailValid && passwordValid)
  }

  const checkPasswordStrength = (pass) => {
    let strength = 0
    if (pass.length > 5) strength += 1
    if (pass.length > 8) strength += 1
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength += 1
    if (pass.match(/\d/)) strength += 1
    if (pass.match(/[^a-zA-Z\d]/)) strength += 1

    setPasswordStrength(strength)

    Animated.timing(strengthAnim, {
      toValue: strength,
      duration: 300,
      useNativeDriver: false,
    }).start()

    if (strength < 2) {
      setStrengthColor('#e74c3c')
      setStrengthText('Weak')
    } else if (strength < 4) {
      setStrengthColor('#f39c12')
      setStrengthText('Moderate')
    } else {
      setStrengthColor('#2ecc71')
      setStrengthText('Strong')
    }
  }

  const handleLogin = async () => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      Alert.alert('Success', 'Logged in successfully!', [
        { text: 'OK', onPress: () => navigation.replace('App') },
      ])
    } catch (error) {
      let errorMessage = 'Invalid email or password'
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled'
          break
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.'
          break
      }
      Alert.alert('Error', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    setResetFlow(true)
    setShowOtpField(false)
    setShowNewPasswordFields(false)
  }

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email')
      return
    }

    try {
      setLoading(true)
      const methods = await fetchSignInMethodsForEmail(auth, email)
      if (methods.length === 0) {
        Alert.alert('Error', 'No account found with this email')
        return
      }

      await sendPasswordResetEmail(auth, email)
      Alert.alert(
        'Email Sent',
        'Password reset instructions have been sent to your email'
      )
      setShowOtpField(true)
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = () => {
    if (otp.length < 6) {
      Alert.alert('Error', 'Please enter a valid OTP')
      return
    }
    setShowNewPasswordFields(true)
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      const user = auth.currentUser
      if (user) {
        await updatePassword(user, newPassword)
        Alert.alert('Success', 'Password reset successfully')
        setResetFlow(false)
        setEmail('')
        setPassword('')
        setOtp('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const strengthWidth = strengthAnim.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  })

  if (resetFlow) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>RESET PASSWORD</Text>

        {!showOtpField && !showNewPasswordFields ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
              <Text style={styles.buttonText}>SEND OTP</Text>
            </TouchableOpacity>
          </>
        ) : showOtpField && !showNewPasswordFields ? (
          <>
            <Text style={styles.otpText}>Enter OTP sent to {email}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>VERIFY OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {newPassword.length > 0 && (
              <View style={styles.strengthContainer}>
                <Text style={styles.strengthLabel}>Password Strength:</Text>
                <View style={styles.strengthBarBackground}>
                  <Animated.View
                    style={[
                      styles.strengthBar,
                      {
                        width: strengthWidth,
                        backgroundColor: strengthColor,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.strengthText, { color: strengthColor }]}>
                  {strengthText}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
            >
              <Text style={styles.buttonText}>RESET PASSWORD</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            setResetFlow(false)
            setShowOtpField(false)
            setShowNewPasswordFields(false)
          }}
        >
          <Text style={styles.secondaryButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password (min 6 characters)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {password.length > 0 && (
        <View style={styles.strengthContainer}>
          <Text style={styles.strengthLabel}>Password Strength:</Text>
          <View style={styles.strengthBarBackground}>
            <Animated.View
              style={[
                styles.strengthBar,
                {
                  width: strengthWidth,
                  backgroundColor: strengthColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.strengthText, { color: strengthColor }]}>
            {strengthText}
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.disabledButton]}
        onPress={handleLogin}
        disabled={!isFormValid || loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signupPrompt}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          disabled={loading}
        >
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  strengthContainer: {
    marginBottom: 15,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  strengthBarBackground: {
    height: 4,
    backgroundColor: '#ecf0f1',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  strengthBar: {
    height: '100%',
  },
  strengthText: {
    fontSize: 12,
    textAlign: 'right',
  },
  otpText: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#666',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#2e86de',
    marginBottom: 20,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2e86de',
    fontWeight: '500',
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    marginRight: 5,
  },
  signupLink: {
    color: '#2e86de',
    fontWeight: 'bold',
  },
})
