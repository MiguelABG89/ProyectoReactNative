import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../../estilos/estilos'
import { signOut } from 'aws-amplify/auth'
import { get } from 'aws-amplify/api';

// Componente para mostrar la pantalla principal
function HomeScreen({ navigation }) {
    // Estados para el idioma
    const [selectedLanguage, setSelectedLanguage] = useState("Seleccione un idioma");

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


    // Función para obtener información de la API
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

            console.log('GET call succeeded: ', str);
        } catch (error) {
            console.log('GET call failed: ', error);
        }
    }

    // Función para cerrar sesión
    async function handleSignOut() {
        try {
            await signOut();
            navigation.navigate("Inicio")
        } catch (error) {
            console.log('error signing out: ', error);
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

            {/* Botones para llamar a la API y cerrar sesión */}
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