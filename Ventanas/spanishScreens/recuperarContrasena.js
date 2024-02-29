import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Auth } from 'aws-amplify';
import styles from '../../estilos/estilos';
import ModalDropdown from 'react-native-modal-dropdown';
import { NavigationAction } from "@react-navigation/native";
import { resetPassword } from 'aws-amplify/auth';

// Componente para cambiar contraseña de la cuenta
function RecuperarContrasena({ navigation }) {
    // Estados para el idioma y usuario
    const [selectedLanguage, setSelectedLanguage] = useState("Español");
    const [username, onChangeUsername] = useState('');

    // Estado para los mensajes de error
    const [mensajeUsernameInvalido, setMensajeUsernameInvalido] = useState("")

    // Lista de idiomas disponibles
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'
    ];

    // Función para enviar código de seguridad
    async function handleResetPassword() {
        try {
            console.log(username);
            await resetPassword({ username });
            console.log('Correo de restablecimiento de contraseña enviado con éxito.');
            navigation.navigate('New Password', { name: [username] });
        } catch (err) {
            console.log(err);
            Alert.alert('Ingreso de usuario', 'El usuario introducido no existe en la base de datos');
        }
    }

    // Maneja la selección de idioma
    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente del idioma seleccionado
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
        }
    };

    // Renderización del componente
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.estructure}>

                    {/* Dropdown para seleccionar idioma */}
                    <ModalDropdown
                        options={languages}
                        defaultValue={selectedLanguage}
                        onSelect={handleLanguageSelect}
                    />

                    {/* Titulo e imagen */}
                    <Text style={styles.titles}>
                        Restablecer la contraseña
                    </Text>
                    <Image
                        source={require('../../assets/candado.png')}
                        style={styles.image}
                    />

                    {/* Input de correo electrónico */}
                    <Text style={styles.text}>
                        Por favor, introduzca su dirección de correo. Le enviaremos las instrucciones para restablecer su contraseña.
                    </Text>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="Usuario"
                    />

                    {/* Mostrar mensaje de error si existe */}
                    {mensajeUsernameInvalido !== "" && <Text style={styles.errors}>{mensajeUsernameInvalido}</Text>}

                    {/* Botón para recuperar contraseña */}
                    <Button
                        color={styles.buttons.color}
                        title="Recuperar contraseña"
                        onPress={() => {
                            // Resetear mensajes de error
                            setMensajeUsernameInvalido("");

                            // Validar campos de entrada
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
