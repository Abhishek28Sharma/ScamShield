import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../api/firebase'

WebBrowser.maybeCompleteAuthSession()

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  })

  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync()
      if (result?.type === 'success') {
        const credential = GoogleAuthProvider.credential(
          result.authentication.idToken
        )
        await signInWithCredential(auth, credential)
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error)
      alert('Google sign-in failed: ' + error.message)
    }
  }

  return { handleGoogleSignIn }
}
