import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text } from "react-native";
import { Auth } from 'aws-amplify';
import styles from '../estilos/estilos'

function RecuperarContrasena({ navigation }) {
    const [email, onChangeEmail] = useState('');
    const [mensajeEmailInvalido, setMensajeEmailInvalido] = useState("")





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
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Correo electrónico"
            />

            {mensajeEmailInvalido !== "" && <Text style={styles.errors}>{mensajeEmailInvalido}</Text>}

            <Button
                color={styles.buttons.color}
                title="Recuperar contraseña"
                onPress={handlePassword}
                    // () => {
                    // setMensajeEmailInvalido("");
                    // if (email.length === 0) {
                    //     setMensajeEmailInvalido("El campo no debe estar vacío.");
                    // } else if (!email.includes("@")) {
                    //     setMensajeEmailInvalido("El email debe contener un '@'");
                    // } else {
                    //     handlePassword(email);
                    // }
                // }}
            />
        </View>
    );
}

export default RecuperarContrasena;
