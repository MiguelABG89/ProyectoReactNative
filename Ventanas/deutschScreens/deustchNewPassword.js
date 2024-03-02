import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../../estilos/estilos'
import { confirmResetPassword } from "@aws-amplify/auth";

// Componente para cambiar contraseña de la cuenta
function DeutschNewPassword({ navigation, route }) {
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
            Alert.alert('Erfolg', 'Das Passwort wurde erfolgreich geändert');
            navigation.navigate("Anmeldung")
        } catch (error) {
            Alert.alert('Fehler', 'Fehler beim Ändern des Passworts. Stellen Sie sicher, dass der eingegebene Code korrekt ist')
            console.log('error en el restablecimiento de contraseña')
        }
    }

    // Renderización del componente
    return (
        <View style={styles.estructure}>

            {/* Título y descripción */}
            <Text style={styles.titles}>
                Setze dein Passwort zurück
            </Text>

            <Text style={styles.text}>
                Bitte geben Sie den erhaltenen Code und Ihr neues Passwort ein.
            </Text>

            {/* Input para el código de confirmación */}
            <TextInput
                style={styles.inputs}
                onChangeText={setCode}
                value={code}
                placeholder="Code"
            />

            {/* Inputs para la contraseña */}
            <View style={styles.viewOjo}>
                <TextInput
                    style={styles.inputPwd}
                    onChangeText={setNewPassword}
                    value={psw}
                    placeholder="Neues Kennwort"
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
                    placeholder="Bestätige das Passwort"
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
                title="Passwort wiederherstellen"
                onPress={() => {
                    // Resetear mensajes de error
                    setMensajePasswordInvalido('')
                    setMensajePasswordsDiferentes('')

                    // Validar campos de entrada
                    if (psw.length < 6) {
                        setMensajePasswordInvalido('Mindestlänge des Passworts: 6 Zeichen')
                    } else if (psw !== confirmarPassword) {
                        setMensajePasswordsDiferentes('Passwörter sind nicht gleich')
                    } else {
                        handleConfirmResetPassword(code, psw)
                    }
                }}
            />
        </View>
    );
};

export default DeutschNewPassword;