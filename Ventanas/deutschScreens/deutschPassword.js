import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Auth } from 'aws-amplify';
import styles from '../../estilos/estilos';
import { NavigationAction } from "@react-navigation/native";
import { resetPassword } from 'aws-amplify/auth';

const DeutschPassword = ({navigation}) => {
    // Estados para el usuario
    const [username, onChangeUsername] = useState('');

    // Estado para los mensajes de error
    const [mensajeUsernameInvalido, setMensajeUsernameInvalido] = useState("")

    // Función para enviar código de seguridad
    async function handleResetPassword() {
        try {
            console.log(username);
            await resetPassword({ username });
            console.log('Correo de restablecimiento de contraseña enviado con éxito.');
            navigation.navigate('Neues Kennwort', { name: [username] });
        } catch (err) {
            console.log(err);
            Alert.alert('Benutzer-Anmeldung', 'Der eingegebene Benutzer ist nicht in der Datenbank vorhanden');
        }
    }

    // Renderización del componente
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.estructure}>

                    {/* Titulo e imagen */}
                    <Text style={styles.titles}>
                        Setze dein Passwort zurück
                    </Text>
                    <Image
                        source={require('../../assets/candado.png')}
                        style={styles.image}
                    />

                    {/* Input de correo electrónico */}
                    <Text style={styles.text}>
                        Bitte geben Sie ihre benutzer ein. Wir senden Ihnen Anweisungen zum Zurücksetzen Ihres Passworts
                    </Text>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="Benutzer"
                    />

                    {/* Mostrar mensaje de error si existe */}
                    {mensajeUsernameInvalido !== "" && <Text style={styles.errors}>{mensajeUsernameInvalido}</Text>}

                    {/* Botón para recuperar contraseña */}
                    <Button
                        color={styles.buttons.color}
                        title="Passwort wiederherstellen"
                        onPress={() => {
                            // Resetear mensajes de error
                            setMensajeUsernameInvalido("");

                            // Validar campos de entrada
                            if (username.length === 0) {
                                setMensajeUsernameInvalido("Das Feld darf nicht leer sein.");
                            } else {
                                handleResetPassword(username);
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default DeutschPassword;
