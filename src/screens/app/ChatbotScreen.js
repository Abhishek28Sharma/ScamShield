import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  BackHandler,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../../contexts/ThemeContext'

const ChatScreen = () => {
  const navigation = useNavigation()
  const { colors, theme } = useTheme()
  const styles = getStyles(colors)

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef()
  const inputRef = useRef()
  const typingIntervalRef = useRef(null)
  const currentTypingMessageRef = useRef('')
  const shouldStopTypingRef = useRef(false)

  // Initial message when user opens the chatbot
  const initialMessage = {
    text: "Hello! I'm your helpful assistant. How can I help you today?",
    sender: 'bot',
    id: Date.now().toString(),
  }

  // Load messages from storage when component mounts
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem('chatMessages')
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages)
          setMessages(parsedMessages)
        } else {
          setMessages([initialMessage])
        }
      } catch (error) {
        console.error('Failed to load messages:', error)
        setMessages([initialMessage])
      }
    }

    loadMessages()
  }, [])

  // Save messages to storage whenever they change
  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('chatMessages', JSON.stringify(messages))
      } catch (error) {
        console.error('Failed to save messages:', error)
      }
    }

    if (messages.length > 0) {
      saveMessages()
    }
  }, [messages])

  // Back button handler
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack()
        return true
      }

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      )

      return () => backHandler.remove()
    }, [navigation])
  )

  const clearChatHistory = async () => {
    Alert.alert(
      'Clear Chat History',
      'Are you sure you want to delete all chat history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('chatMessages')
              setMessages([initialMessage])
            } catch (error) {
              console.error('Failed to clear chat history:', error)
              Alert.alert('Error', 'Failed to clear chat history')
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  const stopTyping = () => {
    shouldStopTypingRef.current = true
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }
    setMessages((prev) => {
      const newMessages = [...prev]
      const lastMessage = newMessages[newMessages.length - 1]
      if (lastMessage.sender === 'bot') {
        lastMessage.text = currentTypingMessageRef.current
      }
      return newMessages
    })
    setIsTyping(false)
  }

  // Typing effect for bot responses
  useEffect(() => {
    if (isTyping) {
      shouldStopTypingRef.current = false
      let index = 0
      const botResponse = currentTypingMessageRef.current

      setMessages((prev) => {
        if (prev.length === 0 || prev[prev.length - 1].sender !== 'bot') {
          return [
            ...prev,
            { text: '', sender: 'bot', id: Date.now().toString() },
          ]
        }
        return prev
      })

      typingIntervalRef.current = setInterval(() => {
        if (shouldStopTypingRef.current) {
          clearInterval(typingIntervalRef.current)
          return
        }

        if (index < botResponse.length) {
          setMessages((prev) => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            if (lastMessage.sender === 'bot') {
              lastMessage.text = botResponse.substring(0, index + 1)
            }
            return newMessages
          })
          index++
        } else {
          clearInterval(typingIntervalRef.current)
          setIsTyping(false)
        }
      }, 20)

      return () => clearInterval(typingIntervalRef.current)
    }
  }, [isTyping])

  const cleanText = (text) => text.replace(/\*\*(.*?)\*\*/g, '$1')

  const formatResponse = (text) => {
    if (!text) return null
    const cleanedText = cleanText(text)
    const paragraphs = cleanedText.split('\n\n').filter((p) => p.trim() !== '')

    return paragraphs.map((paragraph, pIndex) => {
      const lines = paragraph.split('\n').filter((l) => l.trim() !== '')
      return (
        <View key={`para-${pIndex}`} style={styles.paragraph}>
          {lines.map((line, lIndex) => {
            if (
              line.trim().endsWith(':') ||
              (line === line.toUpperCase() &&
                line.length < 50 &&
                !line.match(/^[-*]\s/))
            ) {
              return (
                <Text
                  key={`line-${pIndex}-${lIndex}`}
                  style={styles.botHeading}
                >
                  {line}
                </Text>
              )
            } else if (line.match(/^\d+\.\s/)) {
              return (
                <View key={`line-${pIndex}-${lIndex}`} style={styles.listItem}>
                  <Text style={styles.listBullet}>
                    {line.match(/^\d+\./)[0]}
                  </Text>
                  <Text style={styles.listText}>
                    {line.replace(/^\d+\.\s/, '')}
                  </Text>
                </View>
              )
            } else if (line.match(/^[-*]\s/)) {
              return (
                <View key={`line-${pIndex}-${lIndex}`} style={styles.listItem}>
                  <Text style={styles.listBullet}>•</Text>
                  <Text style={styles.listText}>
                    {line.replace(/^[-*]\s/, '')}
                  </Text>
                </View>
              )
            } else {
              return (
                <Text key={`line-${pIndex}-${lIndex}`} style={styles.botText}>
                  {line}
                </Text>
              )
            }
          })}
        </View>
      )
    })
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      text: input,
      sender: 'user',
      id: Date.now().toString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)
    Keyboard.dismiss()

    try {
      const API_URL = 'https://189a28a0dbf8.ngrok-free.app/api/chat'
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok)
        throw new Error(`Server responded with status ${response.status}`)

      const data = await response.json()
      currentTypingMessageRef.current = data.reply || 'No response from server'
      setIsTyping(true)
    } catch (err) {
      console.error('API call failed:', err)
      setError(err.message)
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${err.message || 'Failed to connect to server'}`,
          sender: 'bot',
          id: Date.now().toString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.cardBackground}
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ChatBot</Text>
        <TouchableOpacity
          onPress={clearChatHistory}
          style={styles.deleteButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <MaterialIcons name="delete" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.chatContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.bubble,
                  msg.sender === 'user' ? styles.userBubble : styles.botBubble,
                ]}
              >
                {msg.sender === 'user' ? (
                  <Text style={styles.userText}>{msg.text}</Text>
                ) : (
                  formatResponse(msg.text)
                )}
              </View>
            ))}
            {isLoading && !isTyping && (
              <View style={[styles.bubble, styles.botBubble]}>
                <ActivityIndicator size="small" color={colors.text} />
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={colors.textSecondary}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              multiline
              editable={!isLoading}
              blurOnSubmit={false}
            />
            {isTyping ? (
              <TouchableOpacity style={styles.stopButton} onPress={stopTyping}>
                <Text style={styles.stopButtonText}>Stop</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!input.trim() || isLoading) && { opacity: 0.5 },
                ]}
                onPress={handleSend}
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="send" size={20} color="white" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      marginTop: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    deleteButton: {
      marginLeft: 16,
    },
    chatContainer: {
      flex: 1,
      paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    },
    chatContent: {
      padding: 16,
      paddingBottom: 80,
    },
    bubble: {
      maxWidth: '80%',
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
    },
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: colors.primary,
      borderBottomRightRadius: 2,
    },
    botBubble: {
      alignSelf: 'flex-start',
      backgroundColor: colors.cardBackground,
      borderBottomLeftRadius: 2,
    },
    userText: {
      color: 'white',
      fontSize: 16,
      lineHeight: 22,
    },
    botText: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 22,
      marginVertical: 2,
    },
    botHeading: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 24,
      marginBottom: 6,
    },
    paragraph: {
      marginBottom: 8,
    },
    listItem: {
      flexDirection: 'row',
      marginVertical: 2,
    },
    listBullet: {
      color: colors.text,
      fontSize: 16,
      marginRight: 8,
    },
    listText: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 22,
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.cardBackground,
    },
    input: {
      flex: 1,
      minHeight: 40,
      maxHeight: 100,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.background,
      borderRadius: 20,
      fontSize: 16,
      color: colors.text,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    stopButton: {
      width: 60,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#FF3B30',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    stopButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
  })

export default ChatScreen
