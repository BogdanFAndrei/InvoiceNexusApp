import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const NewInvoiceScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    amount: '',
    dueDate: '',
    notes: '',
  });
  const [showCustomerPicker, setShowCustomerPicker] = useState(false);

  // Dummy customers data - replace with your actual customers data
  const customers = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const handleSelectCustomer = (customer) => {
    setFormData({
      ...formData,
      customerId: customer.id,
      customerName: customer.name,
    });
    setShowCustomerPicker(false);
  };

  const handleSubmit = () => {
    // Here we'll add the logic to save the invoice
    console.log('Form submitted:', formData);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Invoice</Text>
      </View>

      <View style={styles.form}>
        {/* Customer Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Customer *</Text>
          <TouchableOpacity
            style={[styles.input, styles.customerPicker]}
            onPress={() => setShowCustomerPicker(true)}
          >
            <Text style={formData.customerName ? styles.customerSelected : styles.customerPlaceholder}>
              {formData.customerName || 'Select a customer'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount *</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={formData.amount}
              onChangeText={(text) => setFormData({ ...formData, amount: text })}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Due Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Due Date</Text>
          <TextInput
            style={styles.input}
            value={formData.dueDate}
            onChangeText={(text) => setFormData({ ...formData, dueDate: text })}
            placeholder="YYYY-MM-DD"
          />
        </View>

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Add any additional notes"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Create Invoice</Text>
        </TouchableOpacity>
      </View>

      {/* Customer Picker Modal */}
      <Modal
        visible={showCustomerPicker}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Customer</Text>
              <TouchableOpacity
                onPress={() => setShowCustomerPicker(false)}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.customerList}>
              {customers.map((customer) => (
                <TouchableOpacity
                  key={customer.id}
                  style={styles.customerItem}
                  onPress={() => handleSelectCustomer(customer)}
                >
                  <View>
                    <Text style={styles.customerName}>{customer.name}</Text>
                    <Text style={styles.customerEmail}>{customer.email}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  customerPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerSelected: {
    fontSize: 16,
    color: '#333',
  },
  customerPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  currencySymbol: {
    fontSize: 16,
    color: '#666',
    paddingLeft: 12,
  },
  amountInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  customerList: {
    padding: 16,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  customerEmail: {
    fontSize: 14,
    color: '#666',
  },
});

export default NewInvoiceScreen; 