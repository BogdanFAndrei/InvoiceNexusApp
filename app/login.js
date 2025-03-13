import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';

const THEME_COLORS = {
  blue: '#4285f4',
  purple: '#8a2be2',
  green: '#34a853',
  red: '#ea4335',
  yellow: '#fbbc05',
  pink: '#ff69b4',
};

export default function Login() {
  const [themeColor, setThemeColor] = useState('#4285f4');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
    Animated.spring(scaleAnim, {
      toValue: showColorPicker ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = () => {
    // Add login logic here
    console.log('Login with:', email, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header/Logo */}
      <View style={[styles.header, { backgroundColor: themeColor }]}>
        <View style={styles.logoContainer}>
          <Ionicons name="globe-outline" size={24} color="white" />
          <Text style={styles.logoText}>DemoSite</Text>
        </View>
      </View>

      {/* Login Form */}
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Please log in to continue.</Text>
          
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: themeColor }]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.backButton]}
              onPress={() => router.push("/")}
            >
              <Ionicons name="arrow-back" size={20} color="#666" />
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Color Picker Button */}
      <TouchableOpacity 
        style={styles.colorPickerButton}
        onPress={toggleColorPicker}
      >
        <Ionicons name="color-palette" size={24} color="white" />
      </TouchableOpacity>

      {/* Color Picker Menu */}
      <Modal
        transparent
        visible={showColorPicker}
        animationType="fade"
        onRequestClose={() => setShowColorPicker(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowColorPicker(false)}
        >
          <Animated.View 
            style={[
              styles.colorPickerMenu,
              {
                transform: [{ scale: scaleAnim }],
              }
            ]}
          >
            {Object.entries(THEME_COLORS).map(([name, color]) => (
              <TouchableOpacity
                key={name}
                style={[styles.colorOption, { backgroundColor: color }]}
                onPress={() => {
                  setThemeColor(color);
                  setShowColorPicker(false);
                }}
              />
            ))}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4285f4',
    padding: 16,
    paddingTop: 48,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 32,
  },
  form: {
    gap: 24,
    width: '100%',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#4285f4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  colorPickerButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#333',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPickerMenu: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '80%',
    maxWidth: 300,
    justifyContent: 'center',
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    marginTop: 16,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
}); 