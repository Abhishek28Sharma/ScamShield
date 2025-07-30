// import React, { useState, useEffect } from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Animated,
// } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
// import { auth, createUserWithEmailAndPassword } from '../../api/firebase'

// export default function SignupScreen() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [otp, setOtp] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [passwordStrength, setPasswordStrength] = useState(0)
//   const [strengthColor, setStrengthColor] = useState('#e74c3c')
//   const [strengthText, setStrengthText] = useState('Weak')
//   const [step, setStep] = useState(1) // 1: email, 2: OTP, 3: password setup
//   const navigation = useNavigation()

//   // Password strength animation
//   const strengthAnim = new Animated.Value(0)

//   useEffect(() => {
//     if (step === 3) {
//       checkPasswordStrength(password)
//     }
//   }, [password, step])

//   const checkPasswordStrength = (pass) => {
//     let strength = 0
//     if (pass.length > 5) strength += 1
//     if (pass.length > 8) strength += 1
//     if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength += 1
//     if (pass.match(/\d/)) strength += 1
//     if (pass.match(/[^a-zA-Z\d]/)) strength += 1

//     setPasswordStrength(strength)

//     Animated.timing(strengthAnim, {
//       toValue: strength,
//       duration: 300,
//       useNativeDriver: false,
//     }).start()

//     if (strength < 2) {
//       setStrengthColor('#e74c3c')
//       setStrengthText('Weak')
//     } else if (strength < 4) {
//       setStrengthColor('#f39c12')
//       setStrengthText('Moderate')
//     } else {
//       setStrengthColor('#2ecc71')
//       setStrengthText('Strong')
//     }
//   }

//   const handleSendOTP = async () => {
//     if (!name) {
//       Alert.alert('Error', 'Please enter your name')
//       return
//     }
//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       Alert.alert('Error', 'Please enter a valid email address')
//       return
//     }

//     try {
//       setLoading(true)
//       // In a real app, you would call your backend to send OTP here
//       // This is a mock implementation
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       Alert.alert('OTP Sent', 'Verification code sent to your email')
//       setStep(2)
//     } catch (error) {
//       Alert.alert('Error', 'Failed to send OTP. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleVerifyOTP = () => {
//     if (otp.length < 6) {
//       Alert.alert('Error', 'Please enter the 6-digit OTP')
//       return
//     }
//     // In a real app, you would verify the OTP with your backend here
//     setStep(3)
//   }

//   const handleSignup = async () => {
//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters')
//       return
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match')
//       return
//     }

//     try {
//       setLoading(true)
//       await createUserWithEmailAndPassword(auth, email, password)
//       Alert.alert('Success', 'Account created successfully!')
//       navigation.navigate('Login')
//     } catch (error) {
//       let errorMessage = 'Signup failed. Please try again.'

//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           errorMessage = 'Email already in use'
//           break
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address'
//           break
//         case 'auth/weak-password':
//           errorMessage = 'Password is too weak'
//           break
//       }

//       Alert.alert('Error', errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const strengthWidth = strengthAnim.interpolate({
//     inputRange: [0, 5],
//     outputRange: ['0%', '100%'],
//   })

//   if (step === 1) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>SIGN UP</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Full Name"
//           value={name}
//           onChangeText={setName}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Email Address"
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSendOTP}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={styles.buttonText}>SEND OTP</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.switchAuthText}>
//             Already have an account?{' '}
//             <Text style={styles.switchAuthLink}>Login</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }

//   if (step === 2) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>VERIFY EMAIL</Text>
//         <Text style={styles.subtitle}>
//           Enter the 6-digit code sent to {email}
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="OTP Code"
//           value={otp}
//           onChangeText={setOtp}
//           keyboardType="number-pad"
//           maxLength={6}
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleVerifyOTP}
//           disabled={loading || otp.length < 6}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={styles.buttonText}>VERIFY OTP</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => setStep(1)}
//         >
//           <Text style={styles.secondaryButtonText}>Change Email</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>CREATE PASSWORD</Text>
//       <Text style={styles.subtitle}>For {email}</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Password (min 6 characters)"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       {password.length > 0 && (
//         <View style={styles.strengthContainer}>
//           <Text style={styles.strengthLabel}>Password Strength:</Text>
//           <View style={styles.strengthBarBackground}>
//             <Animated.View
//               style={[
//                 styles.strengthBar,
//                 {
//                   width: strengthWidth,
//                   backgroundColor: strengthColor,
//                 },
//               ]}
//             />
//           </View>
//           <Text style={[styles.strengthText, { color: strengthColor }]}>
//             {strengthText}
//           </Text>
//         </View>
//       )}

//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />

//       <TouchableOpacity
//         style={[
//           styles.button,
//           (password.length < 6 || password !== confirmPassword) &&
//             styles.disabledButton,
//         ]}
//         onPress={handleSignup}
//         disabled={
//           loading || password.length < 6 || password !== confirmPassword
//         }
//       >
//         {loading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text style={styles.buttonText}>COMPLETE SIGNUP</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.secondaryButton}
//         onPress={() => setStep(2)}
//       >
//         <Text style={styles.secondaryButtonText}>Back to OTP</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#666',
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   strengthContainer: {
//     marginBottom: 15,
//   },
//   strengthLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 4,
//   },
//   strengthBarBackground: {
//     height: 4,
//     backgroundColor: '#ecf0f1',
//     borderRadius: 2,
//     overflow: 'hidden',
//     marginBottom: 4,
//   },
//   strengthBar: {
//     height: '100%',
//   },
//   strengthText: {
//     fontSize: 12,
//     textAlign: 'right',
//   },
//   button: {
//     backgroundColor: '#2e86de',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   disabledButton: {
//     backgroundColor: '#95a5a6',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   secondaryButton: {
//     alignItems: 'center',
//     padding: 10,
//   },
//   secondaryButtonText: {
//     color: '#2e86de',
//     fontWeight: '500',
//   },
//   switchAuthText: {
//     textAlign: 'center',
//     color: '#666',
//     marginTop: 20,
//   },
//   switchAuthLink: {
//     color: '#2e86de',
//     fontWeight: 'bold',
//   },
// })
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
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../api/firebase'

export default function SignupScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [strengthColor, setStrengthColor] = useState('#e74c3c')
  const [strengthText, setStrengthText] = useState('Weak')
  const navigation = useNavigation()

  // Password strength animation
  const strengthAnim = new Animated.Value(0)

  useEffect(() => {
    checkPasswordStrength(password)
  }, [password])

  const checkPasswordStrength = (pass) => {
    let strength = 0

    // Length check
    if (pass.length > 5) strength += 1
    if (pass.length > 8) strength += 1

    // Complexity checks
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength += 1
    if (pass.match(/\d/)) strength += 1
    if (pass.match(/[^a-zA-Z\d]/)) strength += 1

    setPasswordStrength(strength)

    // Update UI based on strength
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

  const handleSignup = async () => {
    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    if (!agreeTerms) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions')
      return
    }

    try {
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
      Alert.alert('Success', 'Account created successfully!')
      navigation.navigate('Login')
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.'

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        case 'auth/weak-password':
          errorMessage = 'Password is too weak'
          break
      }

      Alert.alert('Error', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const strengthWidth = strengthAnim.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

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

      {/* Password Strength Indicator */}
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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          {agreeTerms && <View style={styles.checkboxChecked} />}
        </TouchableOpacity>
        <Text style={styles.termsText}>Agree to our Terms & Conditions</Text>
      </View>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchAuthText}>
          Already Have an Account?{' '}
          <Text style={styles.switchAuthLink}>Login Here</Text>
        </Text>
      </TouchableOpacity>
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: '#2e86de',
    borderRadius: 2,
  },
  termsText: {
    color: '#666',
  },
  signupButton: {
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    height: 50,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchAuthText: {
    textAlign: 'center',
    color: '#666',
  },
  switchAuthLink: {
    color: '#2e86de',
    fontWeight: 'bold',
  },
})
