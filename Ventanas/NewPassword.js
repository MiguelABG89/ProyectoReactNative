import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import { Auth } from 'aws-amplify'
import styles from '../estilos/estilos'

function NewPassword({ navigation }) {
    const [code, setCode] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmarPassword, setConfirmarPassword] = React.useState('');

    // TODO MOSTRAR LOS MENSAJES DE ERROR
    const [mensajeCodeInvalido, setMensajeCodeInvalido] = useState("")
    const [mensajePasswordInvalido, setMensajePasswordInvalido] = useState("")
    const [mensajePasswordsDiferentes, setMensajePasswordsDiferentes] = useState("")

    // Collect confirmation code and new password
    async function forgotPasswordSubmit(username, code, newPassword) {
        try {
            const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
            console.log(data);
        } catch (err) {
            console.log(err);
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
                value={newPassword}
                placeholder="Nueva contraseña"
            />

            <TextInput
                style={styles.inputs}
                onChangeText={setConfirmarPassword}
                value={confirmarPassword}
                placeholder="Confirmar contraseña"
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
                    if (code !== "codigo") { // CAMBIAR PARA QUE COMPRUEBE QUE ES IGUAL AL CODIGO ENVIADO
                        setMensajeCodeInvalido("El codigo introducido es incorrecto")
                    } else if (newPassword.length < 6) {
                        setMensajePasswordInvalido('Longitud mínima de la contraseña: 6 caracteres')
                    } else if (newPassword !== confirmarPassword) {
                        setMensajePasswordsDiferentes('Las contraseñas no son iguales')
                    } else {
                        Alert.alert('CAMBIAR CONTRASEÑA');
                    }
                }}
            />

        </View>

    );
};

export default NewPassword;