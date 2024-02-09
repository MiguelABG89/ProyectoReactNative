import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../estilos/estilos'
import {confirmSignUp} from 'aws-amplify/auth'

function ConfirmarCorreo({ navigation }) {
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

    async function handleSignUpConfirmation() {
        const username=user;
        const codeConfirm = code;
        try {
          const { isSignUpComplete, nextStep } = await confirmSignUp({
            username:username,
            confirmationCode:codeConfirm
          });
          navigation.navigate("Inicio")
        } catch (error) {
          console.log('error confirming sign up', error);
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

            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Usuario"/>
            <TextInput style={styles.inputs} onChangeText={setCode} value={code} placeholder="Codigo"/>

            <Button
                onPress={ handleSignUpConfirmation}
                title='Confirmar'
                accessibilityLabel='Confirmar'
                color={styles.buttons.color}
            />
            
        </View>
    );
}

export default ConfirmarCorreo