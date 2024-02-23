import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Auth } from 'aws-amplify';
import styles from '../estilos/estilos';
import ModalDropdown from 'react-native-modal-dropdown';
import { NavigationAction } from "@react-navigation/native";
import { resetPassword } from 'aws-amplify/auth';

function RecuperarContrasena({ navigation }) {
    const [username, onChangeUsername] = useState('');
    const [mensajeUsernameInvalido, setMensajeUsernameInvalido] = useState("")

    const [selectedLanguage, setSelectedLanguage] = useState("Español");
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'
    ];

    async function handleResetPassword() {
        try {
            console.log(username);
            await resetPassword({ username });
            console.log('Correo de restablecimiento de contraseña enviado con éxito.');
            navigation.navigate('New Password', { name: [username] });
        } catch (err) {
            console.log(err);
            Alert.alert('Oops', err.message);
        }
    }

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente correspondiente al idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Recuperar contrasena', { name: 'Recuperar Contrasena' });
                break;
            case 'English':
                navigation.navigate('Recover password', { name: 'Recover password' });
                break;
            case 'Français':
                navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' });
                break;
            case 'Deutsch':
                navigation.navigate('Passwort wiederherstellen', { name: 'Passwort wiederherstellen' });
                break;
            default:
                navigation.navigate('Recuperar contrasena', { name: 'Recuperar Contrasena' });
        }
    };
    function handlePassword() {
        const username = "miguel";

        try {
            console.log(email);
            //await Auth.forgotPassword(username);
            const data = Auth.forgotPassword(email);
            console.log(data);
            console.log('Correo de restablecimiento de contraseña enviado con éxito.');
            navigation.navigate('New Password', { email });
        } catch (err) {
            console.log(err);
            Alert.alert('Oops', err.message);
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>

                <View style={styles.estructure}>
                <ModalDropdown
                        options={languages}
                        defaultValue={selectedLanguage}
                        onSelect={handleLanguageSelect}
                    />

                    <Text style={styles.titles}>
                        Restablecer la contraseña
                    </Text>

                    <Image
                        source={require('../assets/candado.png')}
                        style={styles.image}
                    />

                    <Text style={styles.text}>
                        Por favor, introduzca su dirección de correo. Le enviaremos las instrucciones para restablecer su contraseña.
                    </Text>

                    <TextInput
                        style={styles.inputs}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="Usuario"
                    />

                    {mensajeUsernameInvalido !== "" && <Text style={styles.errors}>{mensajeUsernameInvalido}</Text>}

                    <Button
                        color={styles.buttons.color}
                        title="Recuperar contraseña"
                        onPress={() => {
                            setMensajeUsernameInvalido("");
                            if (username.length === 0) {
                                setMensajeUsernameInvalido("El campo no debe estar vacío.");
                            } else {
                                handleResetPassword(username);
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default RecuperarContrasena;
