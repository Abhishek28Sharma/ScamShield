// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { Ionicons } from '@expo/vector-icons'
// import ChatScreen from './ChatScreen'
// import StatusScreen from './StatusScreen'
// import CallsScreen from './CallsScreen'
// import SettingsScreen from './SettingsScreen'

// const Tab = createBottomTabNavigator()

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName

//           if (route.name === 'Chats') {
//             iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
//           } else if (route.name === 'Status') {
//             iconName = focused ? 'time' : 'time-outline'
//           } else if (route.name === 'Calls') {
//             iconName = focused ? 'call' : 'call-outline'
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline'
//           }

//           return <Ionicons name={iconName} size={size} color={color} />
//         },
//         tabBarActiveTintColor: '#007AFF',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//           paddingBottom: 5,
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           marginBottom: 5,
//         },
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Chats" component={ChatScreen} />
//       <Tab.Screen name="Status" component={StatusScreen} />
//       <Tab.Screen name="Calls" component={CallsScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   )
// }

// export default BottomTabNavigator
