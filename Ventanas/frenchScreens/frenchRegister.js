import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../estilos/estilos'
import { signUp } from 'aws-amplify/auth'


function FrenchRegister({ navigation }) {
    // Estados para el usuario, mail y contraseñas
    const [user, setUser] = useState("");
    const [mail, setMail] = useState("");
    const [pwd, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    // Estados para los mensajes de error
    const [mensajeCamposVacios, setMensajeCamposVacios] = useState("");
    const [mensajePasswordInvalida, setMensajePasswordInvalida] = useState("");
    const [mensajePasswordDiferentes, setMensajePasswordDiferentes] = useState("");

    // Estados y funciones para cambiar la visibilidad de la contraseña
    const [showPwd1, setShowPwd1] = React.useState(true);
    const [showPwd2, setShowPwd2] = React.useState(true);
    const toggleShowPassword1 = () => setShowPwd1(!showPwd1);
    const toggleShowPassword2 = () => setShowPwd2(!showPwd2);

    // Función para manejar el registro de usuario
    async function handleSignUp() {
        const username = user;
        const password = pwd;
        const email = mail;

        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: username,
                password: password,
                options: {
                    userAttributes: {
                        email: email
                    },
                }
            });

            Alert.alert('Inscription réussie', "Enregistrement de l'utilisateur réussi")
            console.log('Register succesfull');
            navigation.navigate("Confirmer le courrier")

        } catch (error) {
            Alert.alert("Échec de l'inscription", "Un utilisateur avec ce nom d'utilisateur existe déjà")
            console.log('error signing up:', error);
        }

    }

    // Renderización del componente
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.estructure}>

                {/* Logo */}
                <Image
                    source={require('../../assets/Logo-FDP.jpg')}
                    style={styles.image}
                />

                {/* Inputs para el usuario y mail */}
                <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Utilisateur" />
                <TextInput style={styles.inputs} onChangeText={setMail} value={mail} placeholder="Mail" />

                {/* Inputs para las contraseñas */}
                <View style={styles.viewOjo}>
                    <TextInput style={styles.inputPwd} onChangeText={setPassword} value={pwd} secureTextEntry={showPwd1} placeholder="Mot de passe" />
                    <TouchableOpacity onPress={toggleShowPassword1} style={styles.touchableOjo}>
                        <Image
                            source={showPwd1 ? require('../../assets/ojoOff.png') : require('../../assets/ojoOn.png')}
                            style={styles.imageOjo}
                        />
                    </TouchableOpacity>
                </View>
                {mensajePasswordInvalida !== "" && <Text style={styles.errors}>{mensajePasswordInvalida}</Text>}

                <View style={styles.viewOjo}>
                    <TextInput style={styles.inputPwd} onChangeText={setPassword2} value={password2} secureTextEntry={showPwd2} placeholder="Confirmer mot de passe" />
                    <TouchableOpacity onPress={toggleShowPassword2} style={styles.touchableOjo}>
                        <Image
                            source={showPwd2 ? require('../../assets/ojoOff.png') : require('../../assets/ojoOn.png')}
                            style={styles.imageOjo}
                        />
                    </TouchableOpacity>
                </View>
                {mensajePasswordDiferentes != "" && <Text style={styles.errors}>{mensajePasswordDiferentes}</Text>}

                {/* Botón para registrarse */}
                <Button
                    title='Enregistrement'
                    accessibilityLabel='Enregistrement'
                    color={styles.buttons.color}
                    onPress={() => {
                        // Resetear mensajes de error
                        setMensajeCamposVacios('')
                        setMensajePasswordInvalida('')
                        setMensajePasswordDiferentes('')

                        // Validar campos de entrada
                        if (user.trim() === '' || pwd.trim() === '' || password2.trim() === '') {
                            setMensajeCamposVacios('Un ou plusieurs champs sont vides')
                        } else if (pwd.length < 6) {
                            setMensajePasswordInvalida('Longueur minimale du mot de passe : 6 caractères')
                        } else if (pwd !== password2) {
                            setMensajePasswordDiferentes('Les mots de passe ne sont pas les mêmes');
                        } else {
                            handleSignUp()
                        }
                    }}
                />

                {/* Texto para confirmar correo */}
                <Text style={styles.linkableText} onPress={() => navigation.navigate("Confirmer le courrier")}>Confirmer le courrier</Text>

                {mensajeCamposVacios != "" && <Text style={styles.errors}>{"\n" + mensajeCamposVacios}</Text>}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default FrenchRegister