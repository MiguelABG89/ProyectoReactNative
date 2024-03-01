import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../../estilos/estilos'
import { confirmSignUp } from 'aws-amplify/auth'

// Componente para confirmar el correo electrónico
function ConfirmarCorreo({ navigation }) {
    // Estados para el idioma, usuario y código de confirmación
    const [selectedLanguage, setSelectedLanguage] = useState("Seleccione un idioma");
    const [user, setUser] = useState("")
    const [code, setCode] = useState("")

    // Lista de idiomas disponibles
    const languages = [
        'Español',
        'English',
        'Français',
        'deutsch',
        '中国人'
    ];

    // Maneja la selección de idioma
    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente del idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Register');
                break;
            case 'English':
                navigation.navigate('englishRegister');
                break;
            case 'Français':
                navigation.navigate('frenchRegister')
                break;
        }
    };

    // Maneja la confirmación del registro
    async function handleSignUpConfirmation() {
        const username = user;
        const codeConfirm = code;
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: username,
                confirmationCode: codeConfirm
            });
            navigation.navigate("Inicio")
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    // Renderización del componente
    return (
        <View style={styles.estructure}>

            {/* Dropdown para seleccionar el idioma */}
            <ModalDropdown
                options={languages}
                defaultValue={selectedLanguage}
                onSelect={handleLanguageSelect}
            />

            {/* Logo */}
            <Image
                source={require('../../assets/Logo-FDP.jpg')}
                style={styles.image}
            />

            {/* Inputs para el usuario y el código */}
            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Usuario" />
            <TextInput style={styles.inputs} onChangeText={setCode} value={code} placeholder="Codigo" />

            {/* Botón para confirmar */}
            <Button
                onPress={handleSignUpConfirmation}
                title='Confirmar'
                accessibilityLabel='Confirmar'
                color={styles.buttons.color}
            />
        </View>
    );
}

export default ConfirmarCorreo