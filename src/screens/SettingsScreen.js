import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'

const SettingsScreen = () => {
  const navigation = useNavigation()
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme, colors } = useTheme()
  const styles = getStyles(colors)

  const [settings, setSettings] = useState({
    darkMode: theme === 'dark',
    notifications: true,
    language: 'en',
  })

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [navigation])

  const toggleSwitch = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] })
    if (setting === 'darkMode') {
      toggleTheme()
    }
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setSettings({ ...settings, language: lng })
  }

  const settingsOptions = [
    {
      title: t('profile'),
      items: [
        {
          name: t('editProfile'),
          icon: 'edit',
          action: () => navigation.navigate('EditProfile'),
          type: 'button',
        },
        {
          name: t('changePassword'),
          icon: 'lock',
          action: () => navigation.navigate('ChangePassword'),
          type: 'button',
        },
      ],
    },
    {
      title: t('preferences'),
      items: [
        {
          name: t('darkMode'),
          icon: 'dark-mode',
          value: settings.darkMode,
          action: () => toggleSwitch('darkMode'),
          type: 'switch',
        },
        {
          name: t('language'),
          icon: 'language',
          value: settings.language,
          action: null,
          type: 'language',
        },
      ],
    },
    {
      title: t('account'),
      items: [
        {
          name: t('logout'),
          icon: 'logout',
          action: () => navigation.navigate('Login'),
          type: 'button',
        },
      ],
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{t('settings')}</Text>

      {settingsOptions.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>

          {section.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.settingItem}>
              <View style={styles.itemLeft}>
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={colors.primary} // Changed from theme.colors.primary to colors.primary
                />
                <Text style={styles.itemText}>{item.name}</Text>
              </View>

              {item.type === 'switch' ? (
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: colors.primaryLight, // Changed from theme.colors.primaryLight
                  }}
                  thumbColor={item.value ? colors.primary : '#f4f3f4'} // Changed from theme.colors.primary
                  onValueChange={item.action}
                  value={item.value}
                />
              ) : item.type === 'language' ? (
                <View style={styles.languageContainer}>
                  <TouchableOpacity
                    onPress={() => changeLanguage('en')}
                    style={[
                      styles.languageButton,
                      settings.language === 'en' && styles.languageActive,
                    ]}
                  >
                    <Text style={styles.languageText}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => changeLanguage('hi')}
                    style={[
                      styles.languageButton,
                      settings.language === 'hi' && styles.languageActive,
                    ]}
                  >
                    <Text style={styles.languageText}>हिंदी</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={item.action}>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color={colors.textSecondary} // Changed from theme.colors.textSecondary
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ))}

      <Text style={styles.versionText}>App version 2.0.1</Text>
    </ScrollView>
  )
}

const getStyles = (
  colors // Changed parameter from theme to colors
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 30,
      marginTop: 35,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 15,
      textTransform: 'uppercase',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 15,
    },
    languageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      marginLeft: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    languageActive: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    languageText: {
      color: colors.text,
    },
    versionText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
  })

export default SettingsScreen
