import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INVOICES_STORAGE_KEY = '@invoicenexus_invoices';

const InvoicesScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [invoices, setInvoices] = useState([]);

  // Load saved invoices when component mounts
  useEffect(() => {
    loadInvoices();
  }, []);

  // Load invoices from AsyncStorage
  const loadInvoices = async () => {
    try {
      const savedInvoices = await AsyncStorage.getItem(INVOICES_STORAGE_KEY);
      if (savedInvoices) {
        setInvoices(JSON.parse(savedInvoices));
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  // Save invoices to AsyncStorage
  const saveInvoices = async (updatedInvoices) => {
    try {
      await AsyncStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(updatedInvoices));
    } catch (error) {
      console.error('Error saving invoices:', error);
    }
  };

  // Check for new invoice data from params
  useEffect(() => {
    const handleNewInvoice = async () => {
      if (params.newInvoice) {
        try {
          const savedInvoices = await AsyncStorage.getItem(INVOICES_STORAGE_KEY) || '[]';
          const currentInvoices = JSON.parse(savedInvoices);
          
          const newInvoiceData = JSON.parse(params.newInvoice);
          const updatedInvoices = [
            {
              id: Date.now().toString(),
              customerName: newInvoiceData.customerName,
              amount: parseFloat(newInvoiceData.amount),
              date: newInvoiceData.dueDate || new Date().toISOString().split('T')[0],
              status: 'pending',
              notes: newInvoiceData.notes
            },
            ...currentInvoices
          ];
          
          await saveInvoices(updatedInvoices);
          setInvoices(updatedInvoices);
        } catch (error) {
          console.error('Error adding new invoice:', error);
        }
      }
    };

    handleNewInvoice();
  }, [params.newInvoice]);

  const handleDeleteInvoice = (invoiceId) => {
    Alert.alert(
      "Delete Invoice",
      "Are you sure you want to delete this invoice?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedInvoices = invoices.filter(invoice => invoice.id !== invoiceId);
            setInvoices(updatedInvoices);
            await saveInvoices(updatedInvoices);
          },
          style: "destructive"
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#34a853';
      case 'pending':
        return '#fbbc05';
      default:
        return '#ea4335';
    }
  };

  const renderInvoiceItem = ({ item }) => (
    <View style={styles.invoiceCard}>
      <TouchableOpacity 
        style={styles.invoiceContent}
        onPress={() => router.push(`/admin/invoices/${item.id}`)}
      >
        <View style={styles.invoiceHeader}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
        </View>
        
        <View style={styles.invoiceFooter}>
          <Text style={styles.date}>{item.date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDeleteInvoice(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#ea4335" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invoices</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/admin/invoices/new')}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>New Invoice</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={invoices}
        renderItem={renderInvoiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  invoiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  invoiceContent: {
    flex: 1,
    padding: 16,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
  },
  invoiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
});

export default InvoicesScreen; 