import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Auth } from 'aws-amplify';
import styles from '../../estilos/estilos';
import { NavigationAction } from "@react-navigation/native";
import { resetPassword } from 'aws-amplify/auth';

// Componente para cambiar contraseña de la cuenta
function RecuperarContrasena({ navigation }) {
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
            navigation.navigate('Nueva contraseña', { name: [username] });
        } catch (err) {
            console.log(err);
            Alert.alert('Ingreso de usuario', 'El usuario introducido no existe en la base de datos');
        }
    }

    // Renderización del componente
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.estructure}>

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
