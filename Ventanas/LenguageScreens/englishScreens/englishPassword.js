import React from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../../../estilos/estilos'

const EnglishPassword = () => {
    const [text, onChangeText] = React.useState('');

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
                navigation.navigate('Recuperar Contrasena', { name: 'Recuperar contrasena' })
                break;
            case 'English':
                navigation.navigate('Recover password', { name: 'Login' })
                break;
            case 'Français':
                navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' })
                break;
            default:
                navigation.navigate('Recover password', { name: 'Recover password' })
        }
    };

    return (

        <View style={styles.estructure}>
            
            <ModalDropdown
                // El valor inicial no es considerado una opcion de la lista y salta un mini error
                options={languages}
                defaultValue={selectedLanguage}
                onSelect={handleLanguageSelect}
            />

            <Text style={styles.titles}>
                Restablecer la contraseña
            </Text>

            <Image
                source={require('../../../assets/candado.png')}
                style={styles.image}
            />

            <Text style={styles.text}>
                Please enter your e-mail. We will send you instructions to reset your password.
            </Text>

            <TextInput
                style={styles.inputs}
                onChangeText={onChangeText}
                value={text}
                placeholder="E-mail"
            />

            <Button
                color={styles.buttons.color}
                title="Recover password"
                onPress={() => {
                    Alert.alert('An email has been sent to the following address:', `${text}`);
                }}
            />

        </View>

    );
};

export default EnglishPassword;