import React, { useState } from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from '../estilos/estilos';
import { Auth } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';
import ModalDropdown from 'react-native-modal-dropdown';

function Login({ navigation }) {
    const [Usu, onChangeUsu] = useState('');
    const [pwd, onChangePwd] = useState('');

    async function handleSingIn() {
        const username = Usu;
        const password = pwd;
        try {
            const { isSignedIn, nextStep } = await signIn({
                username, password,
                options: { authFlowType: "USER_PASSWORD_AUTH" }
            })
            console.log('success')
            navigation.navigate("Home")
        } catch (e) {
            console.log('error singing in')
        }
    }
    async function handleSignOut() {
        try {
            await signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const [selectedLanguage, setSelectedLanguage] = useState("Selecciona un idioma");
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'
    ];

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente correspondiente al idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Inicio', { name: 'Inicio' })
                break;
            case 'English':
                navigation.navigate('Login', { name: 'Login' })
                break;
            case 'Français':
                navigation.navigate('Connecter', { name: 'Connecter' })
                break;
            case 'Deutsch':
                navigation.navigate('Anmeldung', { name: 'Anmeldung' })
                break;
            default:
                navigation.navigate('Inicio', { name: 'Inicio' })
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <SafeAreaView style={styles.estructure}>

                    {/* Menú desplegable de idiomas */}
                    <ModalDropdown
                        options={languages}
                        defaultValue={selectedLanguage}
                        onSelect={handleLanguageSelect}
                    />

                    {/* Imagen logo FP2 */}
                    <Image
                        source={require('../assets/Logo-FDP.jpg')}
                        style={styles.image}
                    />

                    {/* Campo USUARIO */}
                    <TextInput
                        style={styles.inputs}
                        onChangeText={nextUsu => onChangeUsu(nextUsu)}
                        defaultValue={Usu}
                        placeholder="Usuario"
                    />

                    {/* Campo CONTRASEÑA */}
                    <TextInput
                        style={styles.inputs}
                        onChangeText={nextPwd => onChangePwd(nextPwd)}
                        defaultValue={pwd}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                    />

                    {/* RECUPERAR CONTRASEÑA */}
                    <Text style={styles.text}>
                        He olvidado mi{" "}

                        <Text style={styles.linkableText} onPress={() => navigation.navigate('Recuperar Contrasena', { name: 'Recuperar Contrasena' })}>
                            contraseña
                        </Text>
                    </Text>

                    {/* Botón para iniciar sesión */}
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Iniciar sesión"
                        onPress={handleSingIn} />

                    {/* Botón para cerrar sesión */}
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Cerrar sesión"
                        onPress={handleSignOut} />

                    {/* Crear nueva cuenta */}
                    <Text style={styles.text}>¿Necesitas una cuenta?</Text>
                    <Text style={styles.linkableText} onPress={() => navigation.navigate('Registrar', { name: 'Registrar' })}>Registrar</Text>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Login;
