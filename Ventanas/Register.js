import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../estilos/estilos'
import { signUp } from 'aws-amplify/auth'

function Register({ navigation }) {
    const [selectedLanguage, setSelectedLanguage] = useState("Selecciona un idioma");
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'
    ];

    const [user, setUser] = useState("");
    const [mail, setMail] = useState("");
    const [pwd, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [mensajeCamposVacios, setMensajeCamposVacios] = useState("");
    const [mensajePasswordInvalida, setMensajePasswordInvalida] = useState("");
    const [mensajePasswordDiferentes, setMensajePasswordDiferentes] = useState("");

    const [showPwd1, setShowPwd1] = React.useState(true);
    const [showPwd2, setShowPwd2] = React.useState(true);

    // Función para cambiar la visibilidad de la contraseña
    const toggleShowPassword1 = () => setShowPwd1(!showPwd1);
    const toggleShowPassword2 = () => setShowPwd2(!showPwd2);

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage("Español");

        // Navegar al componente correspondiente al idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Registrar', { name: 'Registrar' });
                break;
            case 'English':
                navigation.navigate('Register', { name: 'Register' });
                break;
            case 'Français':
                navigation.navigate('Registre', { name: 'Registre' });
                break;
            case 'Deutsch':
                navigation.navigate('Registrieren', { name: 'Registrieren' });
                break;
            default:
                navigation.navigate('Registrar', { name: 'Registrar' }); // Por defecto, regresa a Español
        }
    }

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


            console.log('Register succesfull');
            navigation.navigate("Confirmar Correo")

        } catch (error) {
            console.log('error signing up:', error);
        }

    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.estructure}>
                <ModalDropdown
                    options={languages}
                    defaultValue={selectedLanguage}
                    onSelect={handleLanguageSelect}
                />

                <Image
                    source={require('../assets/Logo-FDP.jpg')}
                    style={styles.image}
                />

                <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Usuario" />
                <TextInput style={styles.inputs} onChangeText={setMail} value={mail} placeholder="Correo" />

                <View style={styles.viewOjo}>
                    <TextInput style={styles.inputPwd} onChangeText={setPassword} value={pwd} secureTextEntry={showPwd1} placeholder="Contraseña" />
                    <TouchableOpacity onPress={toggleShowPassword1} style={styles.touchableOjo}>
                        <Image
                            source={showPwd1 ? require('../assets/ojoOff.png') : require('../assets/ojoOn.png')}
                            style={styles.imageOjo}
                        />
                    </TouchableOpacity>
                </View>
                {mensajePasswordInvalida !== "" && <Text style={styles.errors}>{mensajePasswordInvalida}</Text>}

                <View style={styles.viewOjo}>
                    <TextInput style={styles.inputPwd} onChangeText={setPassword2} value={password2} secureTextEntry={showPwd2} placeholder="Confirmar contraseña" />
                    <TouchableOpacity onPress={toggleShowPassword2} style={styles.touchableOjo}>
                        <Image
                            source={showPwd2 ? require('../assets/ojoOff.png') : require('../assets/ojoOn.png')}
                            style={styles.imageOjo}
                        />
                    </TouchableOpacity>
                </View>
                {mensajePasswordDiferentes != "" && <Text style={styles.errors}>{mensajePasswordDiferentes}</Text>}

                <Button
                    onPress={() => {
                        // Se vacian los campos de mensajes 
                        setMensajeCamposVacios('')
                        setMensajePasswordInvalida('')
                        setMensajePasswordDiferentes('')

                        //Comprobaciones
                        if (user.trim() === '' || pwd.trim() === '' || password2.trim() === '') {
                            // Ningun campo vacio
                            setMensajeCamposVacios('Uno o más campos están vacíos')
                        } else if (pwd.length < 6) {
                            // Contraseña valida
                            setMensajePasswordInvalida('Longitud mínima de la contraseña: 6 caracteres')
                        } else if (pwd !== password2) {
                            // Confirmar contraseña correcto
                            setMensajePasswordDiferentes('Las contraseñas no son iguales');
                        } else {
                            Alert.alert('Registro correcto', 'El registro de usuario se ha realizado correctamente')
                            handleSignUp()

                        }
                    }}
                    title='Registrarse'
                    accessibilityLabel='Registrarse'
                    color={styles.buttons.color}
                />
                {mensajeCamposVacios != "" && <Text style={styles.errors}>{"\n" + mensajeCamposVacios}</Text>}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export default Register;
