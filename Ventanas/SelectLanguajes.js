import { Text, View, Button, Image } from 'react-native';
import styles from '../estilos/estilos'

// Componente para confirmar el correo electrónico
function SelectLanguajes({ navigation }) {
    // Lista de idiomas disponibles
    const languages = [
        { name: 'Español', flag: require('../assets/espanol_flag.png') },
        { name: 'English', flag: require('../assets/english_flag.png') },
        { name: 'Français', flag: require('../assets/francais_flag.png') },
        { name: 'Deutsch', flag: require('../assets/deutsch_flag.png') }
    ];

    // Función para manejar el cambio de idioma
    const handleLanguageChange = (value) => {

        // Navegar al componente del idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Inicio', { name: 'Inicio' })
                break;
            case 'English':
                navigation.navigate('Login', { name: 'Login' })
                break;
            case 'Français':
                navigation.navigate('Connecter', { name: 'Connecter' })
                break;
            case 'Deutsch':
                navigation.navigate('Anmeldung', { name: 'Anmeldung' })
                break;
        }
    };

    // Renderización del componente
    return (
        <View style={styles.estructure}>

            {/* Logo */}
            <Image
                source={require('../assets/Logo-FDP.jpg')}
                style={styles.image}
            />

            {/* Texto para seleccionar idioma */}
            <Text style={styles.text}>Select a language</Text>

            {/* Lista de botones de idiomas */}
            {languages.map((language, index) => (
                <View key={index} style={{margin: 5}}>
                    <Button
                        color={styles.buttons.color}
                        title={language.name}
                        onPress={() => handleLanguageChange(language.name)}
                    />
                </View>
                
            ))}
        </View>
    );
}

export default SelectLanguajes