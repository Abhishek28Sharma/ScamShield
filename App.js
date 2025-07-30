import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BackHandler } from 'react-native'
import { useEffect } from 'react'
import { ThemeProvider } from './src/contexts/ThemeContext'
import { I18nextProvider } from 'react-i18next'
import i18n from './src/i18n/i18n'
import LoginScreen from './src/screens/auth/LoginScreen'
import SignupScreen from './src/screens/auth/SignupScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import Dashboard from './src/screens/main/Dashboard'
import PasswordResetHandler from './src/components/PasswordResetHandler'
import ChatbotScreen from './src/screens/app/ChatbotScreen'
import { Ionicons } from '@expo/vector-icons'
import LearnScreen from './src/screens/main/LearnScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// Main App Tabs Navigator
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'DashboardTab') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'ChatbotTab') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={Dashboard}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="ChatbotTab"
        component={ChatbotScreen}
        options={{ title: 'Chatbot' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  )
}

function AppContent() {
  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp()
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])

  return (
    <NavigationContainer>
      <PasswordResetHandler />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Main App Stack (after login) */}
        <Stack.Screen name="App" component={AppTabs} />
        <Stack.Screen name="Learn" component={LearnScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <AppContent />
      </I18nextProvider>
    </ThemeProvider>
  )
}
