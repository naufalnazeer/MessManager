import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import UserSelectionScreen from '../screens/UserSelectionScreen';
import CreateMessScreen from '../screens/CreateMess';

const Stack = createStackNavigator();


const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="UserSelection" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="UserSelection" component={UserSelectionScreen} />
                <Stack.Screen name="CreateMess" component={CreateMessScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Routes;

const styles = StyleSheet.create({})