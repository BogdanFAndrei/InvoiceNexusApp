import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
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

export default function Home() {
  const [themeColor, setThemeColor] = useState('#4285f4');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const handleLogin = () => {
    router.push('/login');
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
    Animated.spring(scaleAnim, {
      toValue: showColorPicker ? 0 : 1,
      useNativeDriver: true,
    }).start();
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

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.triangle} />
        <Text style={styles.title}>Welcome to my Demo website</Text>
        <Text style={styles.subtitle}>
          I will be using this website to test different test frameworks.
        </Text>
        
        {/* New Login Button */}
        <TouchableOpacity 
          style={[styles.loginButton, { backgroundColor: themeColor }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login to Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#333',
    marginBottom: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 32,
    lineHeight: 28,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    width: '100%',
    maxWidth: 300,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 32,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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
}); 