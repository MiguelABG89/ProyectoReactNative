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
import EnglishConfirmMail from './Ventanas/englishScreens/englishConfirmMail';
import EnglishHomeScreen from './Ventanas/englishScreens/englishHomeScreen';
import EnglishNewPassword from './Ventanas/englishScreens/englishNewPassword';
{/* FRENCH SCREENS */}
import FrenchRecuperarContrasena  from './Ventanas/frenchScreens/frenchPassword';
import FrenchLogin from './Ventanas/frenchScreens/frenchLogin';
import FrenchRegister from './Ventanas/frenchScreens/frenchRegister';
import FrenchConfirmMail from './Ventanas/frenchScreens/frenchConfirmMail';
import FrenchHomeScreen from './Ventanas/frenchScreens/frenchHomeScreen';
import FrenchNewPassword from './Ventanas/frenchScreens/frenchNewPassword';
{/* DEUTSCH SCREENS */}
import DeutschLogin from './Ventanas/deutschScreens/deutschLogin';
import DeutschRegister from './Ventanas/deutschScreens/deutschRegister';
import DeutschPassword from './Ventanas/deutschScreens/deutschPassword';
import DeutschConfirmMail from './Ventanas/deutschScreens/deustchConfirmMail';
import DeutschHomeScreen from './Ventanas/deutschScreens/deustchHomeScreen';
import DeutschNewPassword from './Ventanas/deutschScreens/deustchNewPassword';

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
        <Stack.Screen name ='Principal' component={HomeScreen} />
        <Stack.Screen name ='Nueva contraseña' component={NewPassword} />
      
        {/* ENGLISH SCREENS */}
        <Stack.Screen name ='Login'component={EnglishLogin}/>
        <Stack.Screen name ='Register' component={EnglishRegister} />
        <Stack.Screen name ='Recover password' component={EnglishPassword} />
        <Stack.Screen name ='Confirm mail' component={EnglishConfirmMail} />
        <Stack.Screen name ='Home' component={EnglishHomeScreen} />
        <Stack.Screen name ='New Password' component={EnglishNewPassword} />


        {/* FRENCH SCREENS */}
        <Stack.Screen name ='Connecter'component={FrenchLogin}/>
        <Stack.Screen name ='Registre' component={FrenchRegister} />
        <Stack.Screen name ='Récupérer mot de passe' component={FrenchRecuperarContrasena} />
        <Stack.Screen name ='Confirmer le courrier' component={FrenchConfirmMail} />
        <Stack.Screen name ='Majeur' component={FrenchHomeScreen} />
        <Stack.Screen name ='Nouveau mot de passe' component={FrenchNewPassword} />
        
        {/* DEUTSCH SCREENS */}
        <Stack.Screen name ='Anmeldung'component={DeutschLogin}/>
        <Stack.Screen name ='Registrieren' component={DeutschRegister} />
        <Stack.Screen name ='Bestätige Email' component={DeutschConfirmMail} />
        <Stack.Screen name ='Passwort wiederherstellen' component={DeutschPassword} />
        <Stack.Screen name ='Heim' component={DeutschHomeScreen} />
        <Stack.Screen name ='Neues Kennwort' component={DeutschNewPassword} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;