import React, { useState } from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from '../../../estilos/estilos';
import { Auth } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';
import ModalDropdown from 'react-native-modal-dropdown';

function DeutschLogin({ navigation }) {
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
        } catch (e) {
            console.log('error singing in', e)
        }
    }

    async function handleSignOut() {
        try {
            await signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const [selectedLanguage, setSelectedLanguage] = useState("Wähle eine Sprache");
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'
    ];

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage("Deutsch");

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
                navigation.navigate('Anmeldung', { name: 'Anmeldung' });
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
                        source={require('../../../assets/Logo-FDP.jpg')}
                        style={styles.image}
                    />
                    <TextInput
                        style={styles.inputs}
                        onChangeText={nextUsu => onChangeUsu(nextUsu)}
                        defaultValue={Usu}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.inputs}
                        onChangeText={nextPwd => onChangePwd(nextPwd)}
                        defaultValue={pwd}
                        placeholder="Passwort"
                        secureTextEntry={true}
                    />
                    <Text style={styles.text}>
                        Ich habe mein {" "}
                        <Text style={styles.linkableText} onPress={() => navigation.navigate('Passwort wiederherstellen', { name: 'Passwort wiederherstellen' })}>
                            Passwort vergessen
                        </Text>
                    </Text>
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Anmeldung"
                        onPress={handleSingIn} />
                    <Text style={styles.text}>Benötigen Sie ein Konto?</Text>
                    <Text style={styles.linkableText} onPress={() => navigation.navigate('Registrieren', { name: 'Registrieren' })}>Registrieren</Text>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default DeutschLogin;
