// src/utils/phoneAuth.js
import auth from '@react-native-firebase/auth'

export const sendOTPToPhone = async (phoneNumber) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
    return confirmation // Save this for later verification
  } catch (error) {
    console.error('Error sending OTP:', error)
    throw error
  }
}

export const verifyPhoneOTP = async (confirmation, otp) => {
  try {
    const credential = await confirmation.confirm(otp)
    return credential.user
  } catch (error) {
    console.error('Invalid OTP:', error)
    throw error
  }
}
