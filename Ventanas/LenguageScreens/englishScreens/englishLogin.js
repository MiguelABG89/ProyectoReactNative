import React, { useState } from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from '../../../estilos/estilos';
import ModalDropdown from 'react-native-modal-dropdown';

function EnglishLogin({ navigation }) {
    const [Usu, onChangeUsu] = React.useState('');
    const [pwd, onChangePwd] = React.useState('');

    const [selectedLanguage, setSelectedLanguage] = useState("Select a language");
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
                        onChangeText={onChangeUsu}
                        value={Usu}
                        placeholder="E-mail"
                    />
                    <TextInput
                        style={styles.inputs}
                        onChangeText={onChangePwd}
                        value={pwd}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <Text style={styles.text}>
                        I forgot my{" "}
                        <Text style={styles.linkableText} onPress={() => navigation.navigate('Recover password', { name: 'Recover Password' })}>
                            password
                        </Text>
                    </Text>
                    <Button
                        color={styles.buttons.color}
                        title="Log in"
                        onPress={() => Alert.alert('Navegación --> Pagina de inicio')} />
                    <Text style={styles.text}>Do you need an account?</Text>
                    <Text style={styles.linkableText} onPress={() => navigation.navigate('Register', { name: 'Register' })}>Register</Text>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default EnglishLogin;
