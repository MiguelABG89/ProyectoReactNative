import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../../estilos/estilos'
import { confirmResetPassword } from "@aws-amplify/auth";

// Componente para cambiar contraseña de la cuenta
function NewPassword({ navigation, route }) {
    // Estados para el codigo y contraseñas
    const [code, setCode] = React.useState('');
    const [psw, setNewPassword] = React.useState('');
    const [confirmarPassword, setConfirmarPassword] = React.useState('');

    // Estados para los mensajes de error
    const [mensajePasswordInvalido, setMensajePasswordInvalido] = useState("")
    const [mensajePasswordsDiferentes, setMensajePasswordsDiferentes] = useState("")

    // Estados y funciones para cambiar la visibilidad de la contraseña
    const [showPwd1, setShowPwd1] = React.useState(true);
    const [showPwd2, setShowPwd2] = React.useState(true);
    const toggleShowPassword1 = () => setShowPwd1(!showPwd1);
    const toggleShowPassword2 = () => setShowPwd2(!showPwd2);

    // Función para modificar contraseña
    async function handleConfirmResetPassword() {
        const username = route.params.name;
        const confirmationCode = code;
        const newPassword = psw;

        try {
            await confirmResetPassword({ username, confirmationCode, newPassword });
            Alert.alert('Exito', 'Contraseña cambiada con exito');
            navigation.navigate("Inicio")
        } catch (error) {
            Alert.alert('Error', 'Error al cambiar la contraseña. Asegurese de que el codigo introducido es correcto')
            console.log('error en el restablecimiento de contraseña')
        }
    }

    // Renderización del componente
    return (
        <View style={styles.estructure}>

            {/* Título y descripción */}
            <Text style={styles.titles}>
                Restablecer la contraseña
            </Text>

            <Text style={styles.text}>
                Por favor, introduzca el código recibido y su nueva contraseña.
            </Text>

            {/* Input para el código de confirmación */}
            <TextInput
                style={styles.inputs}
                onChangeText={setCode}
                value={code}
                placeholder="Código"
            />

            {/* Inputs para la contraseña */}
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
                        source={showPwd1 ? require('../../assets/ojoOff.png') : require('../../assets/ojoOn.png')}
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
                        source={showPwd2 ? require('../../assets/ojoOff.png') : require('../../assets/ojoOn.png')}
                        style={styles.imageOjo}
                    />
                </TouchableOpacity>
            </View>

            {/* Mostrar mensajes de error si existen */}
            {mensajePasswordInvalido != "" && <Text style={styles.errors}>{mensajePasswordInvalido}</Text>}
            {mensajePasswordsDiferentes != "" && <Text style={styles.errors}>{mensajePasswordsDiferentes}</Text>}

            {/* Botón para confirmar restablecimiento de contraseña */}
            <Button
                color={styles.buttons.color}
                title="Recuperar contraseña"
                onPress={() => {
                    // Resetear mensajes de error
                    setMensajePasswordInvalido('')
                    setMensajePasswordsDiferentes('')

                    // Validar campos de entrada
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