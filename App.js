import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
{/* LANGUAJE SCREEN */}
import SelectLanguajes from './Ventanas/SelectLanguajes';
{/* SPANISH SCREENS */}
import Login from "./Ventanas/spanishScreens/spanishLogin";
import Register from './Ventanas/spanishScreens/spanishRegister';
import RecuperarContrasena from "./Ventanas/spanishScreens/spanishrecuperarContrasena";
import ConfirmarCorreo from './Ventanas/spanishScreens/spanishConfirmarCorreo';
import HomeScreen from './Ventanas/spanishScreens/spanishHomeScreen';
import NewPassword from './Ventanas/spanishScreens/spanishNewPassword';
{/* ENGLISH SCREENS */}
import EnglishLogin from './Ventanas/englishScreens/englishLogin';
import EnglishRegister from './Ventanas/englishScreens/englishRegister';
import EnglishPassword from './Ventanas/englishScreens/englishPassword';
{/* FRENCH SCREENS */}
import FrenchRecuperarContrasena  from './Ventanas/frenchScreens/frenchPassword';
import FrenchLogin from './Ventanas/frenchScreens/frenchLogin';
import FrenchRegister from './Ventanas/frenchScreens/frenchRegister';
{/* DEUTSCH SCREENS */}
import DeutschLogin from './Ventanas/deutschScreens/deutschLogin';
import DeutschRegister from './Ventanas/deutschScreens/deutschRegister';
import DeutschPassword from './Ventanas/deutschScreens/deutschPassword';

Amplify.configure(amplifyconfig);


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* SELECT LANGUAJE */}
        <Stack.Screen name ='Select languaje'component={SelectLanguajes}/>
        
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