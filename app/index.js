import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header/Logo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>InvoiceNexus</Text>
        <Text style={styles.headerSubtitle}>Smart Invoice Management</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.triangle} />
        <Text style={styles.title}>Welcome to InvoiceNexus</Text>
        <Text style={styles.subtitle}>
          The place where we make Invoices smarter.
        </Text>
        
        {/* Login Button */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login to Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
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
    backgroundColor: '#4285f4',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 