import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CUSTOMERS_STORAGE_KEY = '@invoicenexus_customers';

const CustomersScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [customers, setCustomers] = useState([]);

  // Load saved customers when component mounts
  useEffect(() => {
    loadCustomers();
  }, []);

  // Load customers from AsyncStorage
  const loadCustomers = async () => {
    try {
      const savedCustomers = await AsyncStorage.getItem(CUSTOMERS_STORAGE_KEY);
      if (savedCustomers) {
        setCustomers(JSON.parse(savedCustomers));
      }
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  // Save customers to AsyncStorage
  const saveCustomers = async (updatedCustomers) => {
    try {
      await AsyncStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(updatedCustomers));
    } catch (error) {
      console.error('Error saving customers:', error);
    }
  };

  // Check for new customer data from params
  useEffect(() => {
    const handleNewCustomer = async () => {
      if (params.newCustomer) {
        try {
          const savedCustomers = await AsyncStorage.getItem(CUSTOMERS_STORAGE_KEY) || '[]';
          const currentCustomers = JSON.parse(savedCustomers);
          
          const newCustomerData = JSON.parse(params.newCustomer);
          const updatedCustomers = [
            {
              id: Date.now().toString(),
              name: newCustomerData.name,
              email: newCustomerData.email,
              company: newCustomerData.company,
              phone: newCustomerData.phone,
              address: newCustomerData.address,
            },
            ...currentCustomers
          ];
          
          await saveCustomers(updatedCustomers);
          setCustomers(updatedCustomers);
        } catch (error) {
          console.error('Error adding new customer:', error);
        }
      }
    };

    handleNewCustomer();
  }, [params.newCustomer]);

  const handleDeleteCustomer = (customerId) => {
    Alert.alert(
      "Delete Customer",
      "Are you sure you want to delete this customer?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedCustomers = customers.filter(customer => customer.id !== customerId);
            setCustomers(updatedCustomers);
            await saveCustomers(updatedCustomers);
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleDeleteCustomersByName = (name) => {
    const customersToDelete = customers.filter(customer => 
      customer.name.toLowerCase().includes(name.toLowerCase())
    );

    if (customersToDelete.length === 0) {
      Alert.alert(
        "No Customers Found",
        `No customers found with name containing "${name}"`
      );
      return;
    }

    Alert.alert(
      "Delete Customers",
      `Are you sure you want to delete ${customersToDelete.length} customer(s) with name containing "${name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedCustomers = customers.filter(customer => 
              !customer.name.toLowerCase().includes(name.toLowerCase())
            );
            setCustomers(updatedCustomers);
            await saveCustomers(updatedCustomers);
            Alert.alert(
              "Success",
              `Successfully deleted ${customersToDelete.length} customer(s)`
            );
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderCustomerItem = ({ item }) => (
    <View style={styles.customerCard}>
      <TouchableOpacity 
        style={styles.customerContent}
        onPress={() => router.push(`/admin/customers/${item.id}`)}
      >
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.customerDetails}>{item.company || 'No company'}</Text>
          <Text style={styles.customerEmail}>{item.email}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDeleteCustomer(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#ea4335" />
      </TouchableOpacity>
    </View>
  );

  const headerSection = (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/admin/dashboard')}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customers</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/admin/customers/new')}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Customer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {headerSection}
      <FlatList
        data={customers}
        renderItem={renderCustomerItem}
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
  customerCard: {
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
  customerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  customerDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 14,
    color: '#888',
  },
  deleteButton: {
    padding: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
});

export default CustomersScreen; 