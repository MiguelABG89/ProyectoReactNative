import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../estilos/estilos'
import ModalDropdown from 'react-native-modal-dropdown';


const RecuperarContrasena = () => {
    const [text, onChangeText] = React.useState('');
    const [mensajeEmailInvalido, setMensajeEmailInvalido] = useState("")

    const [selectedLanguage, setSelectedLanguage] = useState("Español");
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
                navigation.navigate('Recuperar contrasena', { name: 'Recuperar Contrasena' })
                break;
            case 'English':
                navigation.navigate('Recover password', { name: 'Recover password' })
                break;
            case 'Français':
                navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' })
            default:
                navigation.navigate('Recuperar contrasena');
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
                source={require('../assets/candado.png')} // Ajusta la ruta según la ubicación de tu imagen
                style={styles.image}
            />

            <Text style={styles.text}>
                Por favor, introduzca su dirección de correo. Le enviaremos las instrucciones para restablecer su contraseña.
            </Text>

            <TextInput
                style={styles.inputs}
                onChangeText={onChangeText}
                value={text}
                placeholder="Correo electrónico"
            />

            {mensajeEmailInvalido != "" && <Text style={styles.errors}>{mensajeEmailInvalido}</Text>}

            {mensajeEmailInvalido != "" && <Text style={styles.errors}>{mensajeEmailInvalido}</Text>}

            <Button
                color={styles.buttons.color}
                title="Recuperar contraseña"
                onPress={() => {
                    if (text.length > 0 && !text.includes("@")) {
                        setMensajeEmailInvalido("El email debe contener un '@'")
                    } else if (text.length == 0) {
                        setMensajeEmailInvalido("El campo no debe estar vacío.")
                    } else {
                        Alert.alert('Se ha enviado un correo a la siguiente dirección:', `${text}`);
                        setMensajeEmailInvalido("")
                    }
                }}
            />

        </View>

    );
};

export default RecuperarContrasena;