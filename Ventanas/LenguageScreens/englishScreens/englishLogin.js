import React from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image } from "react-native";
import styles from '../../../estilos/estilos'

function EnglishLogin({ navigation }) {
    const [Usu, onChangeUsu] = React.useState('');
    const [pwd, onChangePwd] = React.useState('');

    const [selectedLanguage, setSelectedLanguage] = useState("Select a language");
    const languages = [
        'Español',
        'English',
        'Français',
        'deutsch',
        '中国人'];


    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente correspondiente al idioma seleccionado
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
            default:
                navigation.navigate('Login', { name: 'Login' })
        }
    };

    return (

        <SafeAreaView style={styles.estructure}>
            
            <ModalDropdown
                // El valor inicial no es considerado una opcion de la lista y salta un mini error
                options={languages}
                defaultValue={selectedLanguage}
                onSelect={handleLanguageSelect}
            />

            <Image
                source={require('../../../assets/Logo-FDP.jpg')} // Ajusta la ruta según la ubicación de tu imagen
                style={styles.image}
            />

            <TextInput
                style={styles.inputs}
                onChangeText={onChangeUsu}
                value={Usu}
                placeholder="E-mail"
            />

            <TextInput
                style={styles.inputs}
                onChangeText={onChangePwd}
                value={pwd}
                placeholder="Password"

            />

            <Text style={styles.text}>
                I forgot my{" "}
                {/**cambiar navegación a la nueva ventana en inglés */}
                <Text style={styles.linkableText} onPress={() => navigation.navigate('Recover password', { name: 'Recover Password' })}>
                    password
                </Text>
            </Text>


            <Button
                color={styles.buttons.color}
                title="Log in"
                onPress={() => Alert.alert('Navegación --> Pagina de inicio')} />

            <Text style={styles.text}>Do you need an account?</Text>

            {/**cambiar navegación a la nueva ventana en inglés */}
            <Text style={styles.linkableText} onPress={() => navigation.navigate('Register', { name: 'Register' })}>Register</Text>

        </SafeAreaView>
    );
}

export default EnglishLogin;