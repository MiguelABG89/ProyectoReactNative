import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Auth } from 'aws-amplify';
import styles from '../../estilos/estilos';
import { NavigationAction } from "@react-navigation/native";
import { resetPassword } from 'aws-amplify/auth';

const EnglishPassword = ({ navigation }) => {
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
            navigation.navigate('New Password', { name: [username] });
        } catch (err) {
            console.log(err);
            Alert.alert('User login', 'The entered user does not exist in the database');
        }
    }

    // Renderización del componente
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.estructure}>

                    {/* Titulo e imagen */}
                    <Text style={styles.titles}>
                        Reset your password
                    </Text>
                    <Image
                        source={require('../../assets/candado.png')}
                        style={styles.image}
                    />

                    {/* Input de correo electrónico */}
                    <Text style={styles.text}>
                        Please enter your e-mail. We will send you instructions to reset your password.
                    </Text>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="User"
                    />

                    {/* Mostrar mensaje de error si existe */}
                    {mensajeUsernameInvalido !== "" && <Text style={styles.errors}>{mensajeUsernameInvalido}</Text>}

                    {/* Botón para recuperar contraseña */}
                    <Button
                        color={styles.buttons.color}
                        title="Recover password"
                        onPress={() => {
                            // Resetear mensajes de error
                            setMensajeUsernameInvalido("");

                            // Validar campos de entrada
                            if (username.length === 0) {
                                setMensajeUsernameInvalido("The field must not be empty.");
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

export default EnglishPassword;
