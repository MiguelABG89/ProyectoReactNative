import React, { useState } from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from '../../estilos/estilos';
import ModalDropdown from 'react-native-modal-dropdown';
import { signIn, signOut } from 'aws-amplify/auth';

function EnglishLogin({ navigation }) {
    const [Usu, onChangeUsu] = React.useState('');
    const [pwd, onChangePwd] = React.useState('');

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
            console.log('cierre')
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }


    const [selectedLanguage, setSelectedLanguage] = useState("Select a language");
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'
    ];

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage("English");

        // Navegar al componente correspondiente al idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Inicio', { name: 'Inicio' });
                break;
            case 'English':
                navigation.navigate('Login', { name: 'Login' });
                break;
            case 'Français':
                navigation.navigate('Connecter', { name: 'Connecter' });
                break;
            case 'Deutsch':
                navigation.navigate('Anmeldung', { name: 'Anmeldung' });
                break;
            default:
                navigation.navigate('Login', { name: 'Login' });
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
                        source={require('../../assets/Logo-FDP.jpg')}
                        style={styles.image}
                    />

                    {/* Campo USUARIO */}
                    <TextInput
                        style={styles.inputs}
                        onChangeText={nextUsu => onChangeUsu(nextUsu)}
                        defaultValue={Usu}
                        placeholder="Username"
                    />

                    {/* Campo CONTRASEÑA */}
                    <TextInput
                        style={styles.inputs}
                        onChangeText={nextPwd => onChangePwd(nextPwd)}
                        defaultValue={pwd}
                        placeholder="Password"
                        secureTextEntry={true}
                    />

                    {/* RECUPERAR CONTRASEÑA */}
                    <Text style={styles.text}>
                        I forgot my{" "}
                        <Text style={styles.linkableText} onPress={() => navigation.navigate('Recover password', { name: 'Recover Password' })}>
                            password
                        </Text>
                    </Text>

                    {/* Botón para iniciar sesión */}
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Log in"
                        onPress={handleSingIn} />

                    {/* Botón para cerrar sesión */}
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Log out"
                        onPress={handleSignOut} />

                    {/* Crear nuevo usuario */}
                    <Text style={styles.text}>Do you need an account?</Text>
                    <Text style={styles.linkableText} onPress={() => navigation.navigate('Register', { name: 'Register' })}>Register</Text>

                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default EnglishLogin;
