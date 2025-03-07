import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <GestureHandlerRootView>
      <Routes />
    </GestureHandlerRootView>
  )
}

export default App;