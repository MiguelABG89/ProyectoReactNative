import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../estilos/estilos'
import { confirmResetPassword } from "@aws-amplify/auth";

function NewPassword({ navigation , route }) {
    const [code, setCode] = React.useState('');
    const [psw, setNewPassword] = React.useState('');
    const [confirmarPassword, setConfirmarPassword] = React.useState('');


    // TODO MOSTRAR LOS MENSAJES DE ERROR
    const [mensajeCodeInvalido, setMensajeCodeInvalido] = useState("")
    const [mensajePasswordInvalido, setMensajePasswordInvalido] = useState("")
    const [mensajePasswordsDiferentes, setMensajePasswordsDiferentes] = useState("")

    async function handleConfirmResetPassword() {
        const username = route.params.name;
        const confirmationCode = code;
        const newPassword = psw;

        try {
            console.log(username)
            await confirmResetPassword({ username, confirmationCode, newPassword });
            navigation.navigate("Inicio")
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <View style={styles.estructure}>

            <Text style={styles.titles}>
                Restablecer la contraseña
            </Text>

            <Text style={styles.text}>
                Por favor, introduzca el codigo recivido y su nueva contraseña
            </Text>

            <TextInput
                style={styles.inputs}
                onChangeText={setCode}
                value={code}
                placeholder="Código"
            />

            <TextInput
                style={styles.inputs}
                onChangeText={setNewPassword}
                value={psw}
                placeholder="Nueva contraseña"
                secureTextEntry={true}
            />

            <TextInput
                style={styles.inputs}
                onChangeText={setConfirmarPassword}
                value={confirmarPassword}
                placeholder="Confirmar contraseña"
                secureTextEntry={true}
            />

            {/* Se muestran los mensajes de error si hace falta */}
            {mensajeCodeInvalido != "" && <Text style={styles.errors}>{mensajeCodeInvalido}</Text>}
            {mensajePasswordInvalido != "" && <Text style={styles.errors}>{mensajePasswordInvalido}</Text>}
            {mensajePasswordsDiferentes != "" && <Text style={styles.errors}>{mensajePasswordsDiferentes}</Text>}

            <Button
                color={styles.buttons.color}
                title="Recuperar contraseña"
                onPress={() => {
                    // Se resetean los valores de los mensajes de error
                    setMensajeCodeInvalido('')
                    setMensajePasswordInvalido('')
                    setMensajePasswordsDiferentes('')

                    // Se comprueba si los valores introducidos en los campos son validos
                    if (psw.length < 6) {
                        setMensajePasswordInvalido('Longitud mínima de la contraseña: 6 caracteres')
                    } else if (psw !== confirmarPassword) {
                        setMensajePasswordsDiferentes('Las contraseñas no son iguales')
                    } else {
                        handleConfirmResetPassword(code,psw)
                    }
                }}
            />

        </View>

    );
};

export default NewPassword;