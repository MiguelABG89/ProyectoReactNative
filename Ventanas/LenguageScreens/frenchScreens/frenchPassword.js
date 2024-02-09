import React from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../../../estilos/estilos'

const FrenchRecuperarContrasena = () => {
    const [text, onChangeText] = React.useState('');

    const [selectedLanguage, setSelectedLanguage] = useState("Sélectionnez une langue");
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
                navigation.navigate('Recuperar Contrasena', { name: 'Recuperar Contrasena' })
                break;
            case 'English':
                navigation.navigate('Recover password', { name: 'Recover password' })
                break;
            case 'Français':
                navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' })
                break;
            default:
                navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' })
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
                Veuillez entrer votre e-mail. Nous vous enverrons des instructions pour réinitialiser votre mot de passe.
            </Text>

            <TextInput
                style={styles.inputs}
                onChangeText={onChangeText}
                value={text}
                placeholder="Courrier électronique"
            />

            <Button
                color={styles.buttons.color}
                title="Récupérer le mot de passe"
                onPress={() => {
                    Alert.alert('Un email a été envoyé à l´adresse suivante :', `${text}`);
                }}
            />

        </View>

    );
};

export default FrenchRecuperarContrasena;