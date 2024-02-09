import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
{/* SPANISH SCREENS */}
import Login from "./Ventanas/Login";
import Register from './Ventanas/Register';
import RecuperarContrasena from "./Ventanas/recuperarContrasena";
import ConfirmarCorreo from './Ventanas/ConfirmarCorreo';
import HomeScreen from './Ventanas/HomeScreen';
import NewPassword from './Ventanas/NewPassword';
{/* ENGLISH SCREENS */}
import EnglishLogin from './Ventanas/LenguageScreens/englishScreens/englishLogin';
import EnglishRegister from './Ventanas/LenguageScreens/englishScreens/englishRegister';
import EnglishPassword from './Ventanas/LenguageScreens/englishScreens/englishPassword';
{/* FRENCH SCREENS */}
import FrenchRecuperarContrasena  from './Ventanas/LenguageScreens/frenchScreens/frenchPassword';
import FrenchLogin from './Ventanas/LenguageScreens/frenchScreens/frenchLogin';
import FrenchRegister from './Ventanas/LenguageScreens/frenchScreens/frenchRegister';
{/* DEUTSCH SCREENS */}
import DeutschLogin from './Ventanas/LenguageScreens/deutschScreens/deutschLogin';
import DeutschRegister from './Ventanas/LenguageScreens/deutschScreens/deutschRegister';
import DeutschPassword from './Ventanas/LenguageScreens/deutschScreens/deutschPassword';

Amplify.configure(amplifyconfig);


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* SPANISH SCREENS */}
        <Stack.Screen name ='Inicio'component={Login}/>
        <Stack.Screen name ='Registrar' component={Register} />
        <Stack.Screen name ='Confirmar Correo' component={ConfirmarCorreo} />
        <Stack.Screen name ='Recuperar Contrasena' component={RecuperarContrasena} />
        <Stack.Screen name ='Home' component={HomeScreen} />

        <Stack.Screen name ='New Password' component={NewPassword} />
      
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
        <Stack.Screen name ='Passwort wiederherstellen' component={DeutschPassword} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;