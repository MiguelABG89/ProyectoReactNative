import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../estilos/estilos'
import {signOut} from 'aws-amplify/auth'
import { get } from 'aws-amplify/api';

function HomeScreen({ navigation }) {
    const [selectedLanguage, setSelectedLanguage] = useState("Seleccione un idioma");
    const languages = [
        'Español',
        'English',
        'Français',
        'deutsch',
        '中国人'];

    const [user, setUser] = useState("")
    const [code, setCode] = useState("")

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente correspondiente al idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Register');
                break;
            case 'English':
                navigation.navigate('englishRegister');
                break;
            case 'Français':
                navigation.navigate('frenchRegister')
            default:
                navigation.navigate('Register'); // Por defecto, regresa a Español
        }
    };

   

    async function getTodo() {
        try {
            const restOperation = get({ 
            apiName: 'ProyectoReactNative',
            path: '/items',
            options: {
                queryParams: {
                  id: '1234'
                }
              } 
            });
            const { body } = await restOperation.response;
            const str = await body.json();
            
            console.log('GET call succeeded: ', str );
        } catch (error) {
            console.log('GET call failed: ', error);
        }
    }

    async function handleSignOut() {
        try {
          await signOut();
          navigation.navigate("Inicio")
        } catch (error) {
          console.log('error signing out: ', error);
        }
      }

    return (
        <View style={styles.estructure}>

        <ModalDropdown
            // El valor inicial no es considerado una opcion de la lista y salta un mini error
            options={languages}
            defaultValue={selectedLanguage}
            onSelect={handleLanguageSelect}
        />

            <Image
                source={require('../assets/Logo-FDP.jpg')}
                style={styles.image}
            />

            <Button
                color={styles.buttons.color}
                title="Llamar api"
                onPress={getTodo} 
            />
            <Button
                color={styles.buttons.color}
                title="Cerrar sesión"
                onPress={handleSignOut} 
            />
            
        </View>
    );
}

export default HomeScreen