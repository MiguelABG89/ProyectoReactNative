import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
{/* SPANISH SCREENS */}
import Login from "./Ventanas/Login";
import Register from './Ventanas/Register';
import RecuperarContrasena from "./Ventanas/recuperarContrasena";
{/* ENGLISH SCREENS */}
import EnglishLogin from './Ventanas/LenguageScreens/englishScreens/englishLogin';
import EnglishRegister from './Ventanas/LenguageScreens/englishScreens/englishRegister';
import EnglishPassword from './Ventanas/LenguageScreens/englishScreens/englishPassword';
{/* FRENCH SCREENS */}
import FrenchRecuperarContrasena  from './Ventanas/LenguageScreens/frenchScreens/frenchPassword';
import FrenchLogin from './Ventanas/LenguageScreens/frenchScreens/frenchLogin';
import FrenchRegister from './Ventanas/LenguageScreens/frenchScreens/frenchRegister';
import DeutschLogin from './Ventanas/LenguageScreens/deutschScreens/deutschLogin';
import DeutschRegister from './Ventanas/LenguageScreens/deutschScreens/deutschRegister';

Amplify.configure(amplifyconfig);


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* SPANISH SCREENS */}
        <Stack.Screen name ='Inicio'component={Login}/>
        <Stack.Screen name ='Registrar' component={Register} />
        <Stack.Screen name ='Recuperar Contrasena' component={RecuperarContrasena} />
      
        {/* ENGLISH SCREENS */}
        <Stack.Screen name ='Login'component={EnglishLogin}/>
        <Stack.Screen name ='Register' component={EnglishRegister} />
        <Stack.Screen name ='Recover password' component={EnglishPassword} />


        {/* FRENCH SCREENS */}
        <Stack.Screen name ='Connecter'component={FrenchLogin}/>
        <Stack.Screen name ='Registre' component={FrenchRegister} />
        <Stack.Screen name ='Récupérer mot de passe' component={FrenchRecuperarContrasena} />
        
        {/* DEUTSCH SCREENS */}
        <Stack.Screen name ='Anmeldung'component={DeutschLogin}/>
        <Stack.Screen name ='Registrieren' component={DeutschRegister} />
        <Stack.Screen name ='Récupérer mot de passe' component={FrenchRecuperarContrasena} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;