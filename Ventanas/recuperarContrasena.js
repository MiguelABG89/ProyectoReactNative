import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text } from "react-native";
import { resetPassword } from 'aws-amplify/auth';
import styles from '../estilos/estilos'

function RecuperarContrasena({ navigation }) {
    const [username, onChangeUsername] = useState('');
    const [mensajeUsernameInvalido, setMensajeUsernameInvalido] = useState("")

    async function handlePassword() {
        try {
            console.log(username);
            await resetPassword( {username} );
            console.log('Correo de restablecimiento de contraseña enviado con éxito.');
            navigation.navigate('New Password', { username });
        } catch (err) {
            console.log(err);
            Alert.alert('Oops', err.message);
        }
    }

    return (
        <View style={styles.estructure}>
            <Text style={styles.titles}>
                Restablecer la contraseña
            </Text>

            <Image
                source={require('../assets/candado.png')}
                style={styles.image}
            />

            <Text style={styles.email}>
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
                onPress={ () => {
                    setMensajeUsernameInvalido("");
                    if (username.length === 0) {
                        setMensajeUsernameInvalido("El campo no debe estar vacío.");
                    } else {
                        handlePassword(username);
                    }
                }}
            />
        </View>
    );
}

export default RecuperarContrasena;
