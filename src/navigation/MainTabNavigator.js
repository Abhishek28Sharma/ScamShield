import ChatbotScreen from '../screens/app/ChatbotScreen'

import Dashboard from '../screens/main/Dashboard'
import SettingsScreen from '../screens/SettingsScreen'

export default function MainTabNavigator() {
  return (
    <Tab.Navigator /* ... */>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="ChatBot" component={ChatbotScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      {/* Add other tabs as needed */}
    </Tab.Navigator>
  )
}
