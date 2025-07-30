import { useEffect } from 'react'
import { Linking } from 'react-native'
import { confirmPasswordReset, auth } from '../api/firebase'

export default function PasswordResetHandler({ navigation }) {
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (!url) return

      // Extract the oobCode from the URL
      const oobCode = new URL(url).searchParams.get('oobCode')

      if (oobCode) {
        navigation.navigate('ResetPassword', { oobCode })
      }
    }

    // Get initial URL if app was launched from a deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url })
    })

    // Listen for incoming deep links
    Linking.addEventListener('url', handleDeepLink)

    return () => {
      Linking.removeEventListener('url', handleDeepLink)
    }
  }, [])

  return null
}
