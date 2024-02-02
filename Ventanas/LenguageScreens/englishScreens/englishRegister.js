import { useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from '../../../estilos/estilos'


function EnglishRegister() {
    const [selectedLanguage, setSelectedLanguage] = useState("Seleccione un idioma");
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'];

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [mensajeCamposVacios, setMensajeCamposVacios] = useState("")
    const [mensajePasswordInvalida, setMensajePasswordInvalida] = useState("")
    const [mensajePasswordDiferentes, setMensajePasswordDiferentes] = useState("")

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente correspondiente al idioma seleccionado
        // switch (value) {
        //     case 'Español':
        //         navigation.navigate('Register');
        //         break;
        //     case 'English':
        //         navigation.navigate('englishRegister');
        //         break;
        //     case 'Français':
        //         navigation.navigate('frenchRegister')
        //     default:
        //         navigation.navigate('Register'); // Por defecto, regresa a Español
        // }
    };

    return (
        <View style={styles.estructure}>

            <ModalDropdown
                // El valor inicial no es considerado una opcion de la lista y salta un mini error
                options={languages}
                defaultValue={selectedLanguage}
                onSelect={handleLanguageSelect}
            />

            <Image
                source={require('../../../assets/Logo-FDP.jpg')}
                style={styles.image}
            />

            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="E-mail" />

            {/* Boton para ocultar */}
            <TextInput style={styles.inputs} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="Password" />
            <Text style={styles.errors}>{mensajePasswordInvalida}</Text>

            {/* Boton para ocultar */}
            <TextInput style={styles.inputs} onChangeText={setPassword2} value={password2} secureTextEntry={true} placeholder="Confirm password" />
            <Text style={styles.errors}>{mensajePasswordDiferentes}</Text>

            <Button
                onPress={() => {
                    // Se vacian los campos de mensajes 
                    setMensajeCamposVacios('')
                    setMensajePasswordInvalida('')
                    setMensajePasswordDiferentes('')

                    //Comprobaciones
                    if (user.trim() === '' || password.trim() === '' || password2.trim() === '') {
                        // Ningun campo vacio
                        setMensajeCamposVacios('One or more fields are empty')
                    } else if (password.length < 6) {
                        // Contraseña valida
                        setMensajePasswordInvalida('Minimum password length: 6 characters')
                    } else if (password !== password2) {
                        // Confirmar contraseña correcto
                        setMensajePasswordDiferentes('Passwords do not match');
                    } else {
                        Alert.alert('Successful registration', 'User registration was successful')
                    }
                }}
                title='Registrarse'
                accessibilityLabel='Registrarse'
                color={styles.buttons.color}
            />
            <Text style={styles.errors}>{"\n" + mensajeCamposVacios}</Text>
        </View>
    );
}

export default EnglishRegister