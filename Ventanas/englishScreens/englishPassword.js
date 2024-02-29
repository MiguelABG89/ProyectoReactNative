import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from '../../estilos/estilos';
import ModalDropdown from 'react-native-modal-dropdown';

const EnglishPassword = () => {
    const [text, onChangeText] = React.useState('');
    const [selectedLanguage, setSelectedLanguage] = useState("Select a language");
    const languages = [
        'Español',
        'English',
        'Français',
        'deutsch',
        '中国人'
    ];

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage("English");

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
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.estructure}>
                <ModalDropdown
                    options={languages}
                    defaultValue={selectedLanguage}
                    onSelect={handleLanguageSelect}
                />
                <Text style={styles.titles}>
                    Recover your password
                </Text>

                <Image
                    source={require('../../assets/candado.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    Please enter your username. We will send you instructions to reset your password.
                </Text>
                <TextInput
                    style={styles.inputs}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Username"
                />
                <Button
                    color={styles.buttons.color}
                    title="Recover password"
                    onPress={() => {
                        Alert.alert('An email has been sent to the following address:', `${text}`);
                    }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EnglishPassword;
