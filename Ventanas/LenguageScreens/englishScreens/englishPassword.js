import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from '../../../estilos/estilos';
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
        setSelectedLanguage(value);
        // Aquí deberías definir cómo se navega a la página correspondiente al idioma seleccionado
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
                    Restablecer la contraseña
                </Text>
                <Image
                    source={require('../../../assets/candado.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>
                    Please enter your e-mail. We will send you instructions to reset your password.
                </Text>
                <TextInput
                    style={styles.inputs}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="E-mail"
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
