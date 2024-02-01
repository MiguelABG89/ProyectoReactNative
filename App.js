import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Ventanas/Login";
import Register from './Ventanas/Register';
import RecuperarContrasena from "./Ventanas/recuperarContrasena";
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Inicio'
          component={Login}
        ></Stack.Screen>
        <Stack.Screen name='Registrar' component={Register} />
        <Stack.Screen name='Recuperar Contrasena' component={RecuperarContrasena} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

