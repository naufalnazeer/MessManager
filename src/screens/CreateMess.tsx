import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Contacts from 'react-native-contacts';  // Import contacts library

const CreateMessScreen = ({route}) => {
  const { messType } = route.params;
  const [messName, setMessName] = useState('');
  const [members, setMembers] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addedUsers, setAddedUsers] = useState([]);

  // Function to pick a contact
  const pickContact = () => {
    Contacts.openContactForm()
      .then((contact) => {
        if (contact.phoneNumbers.length > 0) {
          const phone = contact.phoneNumbers[0].number;  // Get first phone number
          if (!addedUsers.includes(phone)) {
            setAddedUsers([...addedUsers, phone]);
          } else {
            Alert.alert('Already Added', 'This number is already added.');
          }
        } else {
          Alert.alert('No Phone Number', 'This contact does not have a phone number.');
        }
      })
      .catch((err) => console.log('Error selecting contact:', err));
  };

  // Function to add user manually (phone number entry)
  const addUser = () => {
    if (phoneNumber.length === 10 && !addedUsers.includes(phoneNumber)) {
      setAddedUsers([...addedUsers, phoneNumber]);
      setPhoneNumber('');
    } else if (addedUsers.includes(phoneNumber)) {
      Alert.alert('Already Added', 'This number is already added.');
    }
  };

  // Function to remove user
  const removeUser = (number) => {
    setAddedUsers(addedUsers.filter((item) => item !== number));
  };

  // Function to create mess
  const handleCreateMess = () => {
    console.log("Mess Created:", { messName, messType, members, addedUsers });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Mess</Text>

      {/* Mess Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="food" size={24} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Enter Mess Name"
          value={messName}
          onChangeText={setMessName}
        />
      </View>

      {/* Mess Type Dropdown */}
      <View style={styles.inputContainer}>
        <Icon name="account-group" size={24} color="#555" />
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Enter Mess Type (e.g. Business or Community)"
          value={messType}
        />
      </View>

      {/* Number of Members */}
      <View style={styles.inputContainer}>
        <Icon name="account-multiple" size={24} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Number of Members"
          keyboardType="numeric"
          value={members}
          onChangeText={setMembers}
        />
      </View>

      {/* Add Members with Phone Number */}
      <View style={styles.inputContainer}>
        <Icon name="phone" size={24} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Enter Member Phone Number"
          keyboardType="numeric"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity onPress={addUser} style={styles.addButton}>
          <Icon name="plus-circle" size={24} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickContact} style={styles.addButton}>
          <Icon name="contacts" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Display Added Users */}
      <FlatList
        data={addedUsers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item}</Text>
            <TouchableOpacity onPress={() => removeUser(item)}>
              <Icon name="close-circle" size={22} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Create Mess Button */}
      <TouchableOpacity style={styles.button} onPress={handleCreateMess}>
        <Text style={styles.buttonText}>Create Mess</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  addButton: {
    marginLeft: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateMessScreen;
