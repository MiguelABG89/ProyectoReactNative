import React, { useState } from "react";
import { Text, TextInput, View, Button, Alert, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../../estilos/estilos';

function DeutschRegister({ navigation }) {
    const [selectedLanguage, setSelectedLanguage] = useState("Wähle eine Sprache");
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'];

    const [user, setUser] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [mensajeCamposVacios, setMensajeCamposVacios] = useState("");
    const [mensajePasswordInvalida, setMensajePasswordInvalida] = useState("");
    const [mensajePasswordDiferentes, setMensajePasswordDiferentes] = useState("");

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

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
                navigation.navigate('Registrieren', { name: 'Registrieren' });
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
                <Image
                    source={require('../../assets/Logo-FDP.jpg')}
                    style={styles.image}
                />
                <TextInput
                    style={styles.inputs}
                    onChangeText={setUser}
                    value={user}
                    placeholder="Benutzer"
                />
                <TextInput style={styles.inputs} onChangeText={setMail} value={mail} placeholder="Email"/>
                <TextInput
                    style={styles.inputs}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Passwort"
                />
                {mensajePasswordInvalida !== "" && <Text style={styles.errors}>{mensajePasswordInvalida}</Text>}
                <TextInput
                    style={styles.inputs}
                    onChangeText={setPassword2}
                    value={password2}
                    secureTextEntry={true}
                    placeholder="Bestätige das Passwort"
                />
                {mensajePasswordDiferentes !== "" && <Text style={styles.errors}>{mensajePasswordDiferentes}</Text>}
                <Button
                    onPress={() => {
                        // Se vacian los campos de mensajes
                        setMensajeCamposVacios('');
                        setMensajePasswordInvalida('');
                        setMensajePasswordDiferentes('');

                        // Comprobaciones
                        if (user.trim() === '' || password.trim() === '' || password2.trim() === '') {
                            // Ningun campo vacio
                            setMensajeCamposVacios('Ein oder mehrere Felder sind leer');
                        } else if (password.length < 6) {
                            // Contraseña valida
                            setMensajePasswordInvalida('Mindestlänge des Passworts: 6 Zeichen');
                        } else if (password !== password2) {
                            // Confirmar contraseña correcto
                            setMensajePasswordDiferentes('Passwörter sind nicht gleich');
                        } else {
                            Alert.alert('Erfolgreiche Registrierung', 'Benutzerregistrierung erfolgreich');
                        }
                    }}
                    title='Registrieren'
                    accessibilityLabel='Registrieren'
                    color={styles.buttons.color}
                />
                {mensajeCamposVacios !== "" && <Text style={styles.errors}>{"\n" + mensajeCamposVacios}</Text>}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default DeutschRegister;
