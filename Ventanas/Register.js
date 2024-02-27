import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../estilos/estilos'
import {signUp} from 'aws-amplify/auth'

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
            password: password ,
            options: {
              userAttributes: {
                email: email
              },
            }
          });

          Alert.alert('Registro correcto', 'El registro de usuario se ha realizado correctamente')
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

            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Usuario"/>
            <TextInput style={styles.inputs} onChangeText={setMail} value={mail} placeholder="Correo"/>

            <TextInput style={styles.inputs} onChangeText={setPassword} value={pwd} secureTextEntry={true} placeholder="Contraseña"/>
            {mensajePasswordInvalida !== "" && <Text style={styles.errors}>{mensajePasswordInvalida}</Text>}

            <TextInput style={styles.inputs} onChangeText={setPassword2} value={password2} secureTextEntry={true} placeholder="Confirmar contraseña"/>
            {mensajePasswordDiferentes != "" && <Text style={styles.errors}>{mensajePasswordDiferentes}</Text>}

            <Button
                onPress={ ()=>{
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
