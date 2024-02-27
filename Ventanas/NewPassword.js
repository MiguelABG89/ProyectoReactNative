import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../estilos/estilos'
import { confirmResetPassword } from "@aws-amplify/auth";

function NewPassword({ navigation, route }) {
    const [code, setCode] = React.useState('');
    const [psw, setNewPassword] = React.useState('');
    const [confirmarPassword, setConfirmarPassword] = React.useState('');
    const [showPwd1, setShowPwd1] = React.useState(true);
    const [showPwd2, setShowPwd2] = React.useState(true);

    // Función para cambiar la visibilidad de la contraseña
    const toggleShowPassword1 = () => setShowPwd1(!showPwd1);
    const toggleShowPassword2 = () => setShowPwd2(!showPwd2);

    // TODO MOSTRAR LOS MENSAJES DE ERROR
    const [mensajeCodeInvalido, setMensajeCodeInvalido] = useState("")
    const [mensajePasswordInvalido, setMensajePasswordInvalido] = useState("")
    const [mensajePasswordsDiferentes, setMensajePasswordsDiferentes] = useState("")

    async function handleConfirmResetPassword() {
        const username = route.params.name;
        const confirmationCode = code;
        const newPassword = psw;

        try {
            await confirmResetPassword({ username, confirmationCode, newPassword });
            showAlert();
            navigation.navigate("Inicio")
        } catch (error) {
            console.log(error)
        }
    }

    const showAlert = () => {
        Alert.alert(
            'Título',
            'mensaje de alerta',
            [
                {
                    text: 'Aceptar',
                    onPress: () => console.log('Aceptar presionado')
                }
            ],
            { cancelable: false }
        )
    }


    return (

        <View style={styles.estructure}>

            <Text style={styles.titles}>
                Restablecer la contraseña
            </Text>

            <Text style={styles.text}>
                Por favor, introduzca el código recibido y su nueva contraseña.
            </Text>

            <TextInput
                style={styles.inputs}
                onChangeText={setCode}
                value={code}
                placeholder="Código"
            />

            <View style={styles.viewOjo}>
                <TextInput
                    style={styles.inputPwd}
                    onChangeText={setNewPassword}
                    value={psw}
                    placeholder="Nueva contraseña"
                    secureTextEntry={showPwd1}
                />
                <TouchableOpacity onPress={toggleShowPassword1} style={styles.touchableOjo}>
                    <Image
                        source={showPwd1 ? require('../assets/ojoOff.png') : require('../assets/ojoOn.png')}
                        style={styles.imageOjo}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.viewOjo}>
                <TextInput
                    style={styles.inputPwd}
                    onChangeText={setConfirmarPassword}
                    value={confirmarPassword}
                    placeholder="Confirmar contraseña"
                    secureTextEntry={showPwd2}
                />

                <TouchableOpacity onPress={toggleShowPassword2} style={styles.touchableOjo}>
                    <Image
                        source={showPwd2 ? require('../assets/ojoOff.png') : require('../assets/ojoOn.png')}
                        style={styles.imageOjo}
                    />
                </TouchableOpacity>
            </View>

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
                        handleConfirmResetPassword(code, psw)
                    }
                }}
            />

        </View>

    );
};

export default NewPassword;