import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text } from "react-native";
import styles from '../estilos/estilos'

const RecuperarContrasena = () => {
    const [text, onChangeText] = React.useState('');
    const [mensajeEmailInvalido, setMensajeEmailInvalido] = useState("")

    return (

        <View style={styles.estructure}>

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

            <Button
                color={styles.buttons.color}
                title="Recuperar contraseña"
                onPress={() => {
                    if (text.length > 0 && !text.includes("@")) {
                        setMensajeEmailInvalido("El email debe contener un '@'")
                    } else if (text.length == 0){
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