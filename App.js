import { StatusBar } from 'expo-status-bar';
import {  View } from 'react-native';
import Login from './Login';
// App.js

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

export default function App() {
  return (
    <View >
      <Login/>
    </View>
  );
}

