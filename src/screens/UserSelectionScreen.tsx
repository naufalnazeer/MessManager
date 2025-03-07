import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserSelectionScreen = ({navigation}) => {
  const [selectedUser, setSelectedUser] = useState<'business' | 'community' | null>(null);

  return (
    <View style={styles.container}>
      
      {/* 🔘 Title */}
      <Text style={styles.title}>Select Your User Type</Text>

      {/* 🏢 Business User */}
      <TouchableOpacity
        style={[styles.option, selectedUser === 'business' && styles.selected]}
        onPress={() => setSelectedUser('business')}>
        <Icon name="storefront" size={50} color={selectedUser === 'business' ? '#4caf50' : 'gray'} />
        <Text style={styles.optionTitle}>Business User</Text>
        <Text style={styles.description}>Manage a mess, handle orders & customers.</Text>
      </TouchableOpacity>

      {/* 👨‍🍳 Community Mess User */}
      <TouchableOpacity
        style={[styles.option, selectedUser === 'community' && styles.selected]}
        onPress={() => setSelectedUser('community')}>
         <Icon name="account-group" size={50} color={selectedUser === 'community' ? '#4caf50' : 'gray'} />
        <Text style={styles.optionTitle}>Community Mess User</Text>
        <Text style={styles.description}>Cook & share expenses with others.</Text>
      </TouchableOpacity>

      {/* 🎛️ Action Buttons */}
      {selectedUser && (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>{
              navigation.navigate(selectedUser === 'business' ? 'CreateMess' : 'CreateMess', {messType: selectedUser})
            }}>
            <Text style={styles.buttonText}>Create Mess</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => /* navigation.navigate('JoinMess') */ {}}>
            <Text style={styles.secondaryButtonText}>Join Existing Mess</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// 🌟 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  option: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#4caf50',
    borderWidth: 2,
  },
  secondaryButtonText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserSelectionScreen;
