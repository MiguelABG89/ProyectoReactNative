import React, { useState } from "react";
import { Button, View, TextInput, Image, Alert, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from '../../estilos/estilos'
import ModalDropdown from 'react-native-modal-dropdown';

const DeutschPassword = ({navigation}) => {
    const [text, onChangeText] = React.useState('');
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
                navigation.navigate('Recuperar Contrasena', { name: 'Recuperar contrasena' })
                break;
            case 'English':
                navigation.navigate('Recover password', { name: 'Login' })
                break;
            case 'Français':
                navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' })
                break;
            case 'Deutsch':
                navigation.navigate('Passwort wiederherstellen', { name: 'Passwort wiederherstellen' })
                break;
            default:
                navigation.navigate('Passwort wiederherstellen', { name: 'Passwort wiederherstellen' })
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView>
                <View style={styles.estructure}>
                    <ModalDropdown
                        options={languages}
                        defaultValue={selectedLanguage}
                        onSelect={handleLanguageSelect}
                    />
                    <Text style={styles.titles}>
                        Setze dein Passwort zurück
                    </Text>
                    <Image
                        source={require('../../assets/candado.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text}>
                        Bitte geben Sie ihre benutzer ein. Wir senden Ihnen Anweisungen zum Zurücksetzen Ihres Passworts.
                    </Text>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Benutzer"
                    />
                    <Button
                        color={styles.buttons.color}
                        title="Passwort wiederherstellen"
                        onPress={() => {
                            Alert.alert('Eine E-Mail wurde an folgende Adresse gesendet:', `${text}`);
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default DeutschPassword;
