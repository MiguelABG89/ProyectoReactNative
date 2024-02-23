import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Text, Button, TextInput, Alert, Image, KeyboardAvoidingView, ScrollView, View } from "react-native";
import styles from '../estilos/estilos';
import { Auth } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';
import ModalDropdown from 'react-native-modal-dropdown';

function Login({ navigation }) {
    const [Usu, onChangeUsu] = useState('');
    const [pwd, onChangePwd] = useState('');

    const [showPwd1, setShowPwd1] = React.useState(true);
    const [showPwd2, setShowPwd2] = React.useState(true);

    // Función para cambiar la visibilidad de la contraseña
    const toggleShowPassword1 = () => setShowPwd1(!showPwd1);
    const toggleShowPassword2 = () => setShowPwd2(!showPwd2);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            // Esta función se ejecuta cuando el componente deja de estar en pantalla
            onChangeUsu('');
            onChangePwd('');
        });

        return unsubscribe;
    }, [navigation]);

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

                    <ModalDropdown
                        options={languages}
                        defaultValue={selectedLanguage}
                        onSelect={handleLanguageSelect}
                    />

                    <Image
                        source={require('../assets/Logo-FDP.jpg')}
                        style={styles.image}
                    />

                    <TextInput
                        style={styles.inputs}
                        onChangeText={nextUsu => onChangeUsu(nextUsu)}
                        defaultValue={Usu}
                        placeholder="Correo electrónico"
                    />

                    <View style={styles.viewOjo}>
                        <TextInput
                            style={styles.inputPwd}
                            onChangeText={nextPwd => onChangePwd(nextPwd)}
                            defaultValue={pwd}
                            placeholder="Contraseña"
                            secureTextEntry={showPwd1}
                        />
                        <TouchableOpacity onPress={toggleShowPassword1} style={styles.touchableOjo}>
                            <Image
                                source={showPwd1 ? require('../assets/ojoOff.png') : require('../assets/ojoOn.png')}
                                style={styles.imageOjo}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.text}>
                        He olvidado mi{" "}
                        <Text style={styles.linkableText} onPress={() => navigation.navigate('Recuperar Contrasena', { name: 'Recuperar Contrasena' })}>
                            contraseña
                        </Text>
                    </Text>

                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Iniciar sesión"
                        onPress={handleSingIn} />
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Cerrar sesión"
                        onPress={handleSignOut} />

                    <Text style={styles.text}>¿Necesitas una cuenta?</Text>

                    <Text style={styles.linkableText} onPress={() => navigation.navigate('Registrar', { name: 'Registrar' })}>Registrar</Text>

                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Login;