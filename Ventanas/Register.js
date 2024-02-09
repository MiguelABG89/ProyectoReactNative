import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../estilos/estilos'


function Register() {
    const [selectedLanguage, setSelectedLanguage] = useState("Seleccione un idioma");
    const languages = [
        'Español',
        'English',
        'Français',
        'deutsch',
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
            options={languages}
            defaultValue={languages[0]}
            onSelect={handleLanguageSelect}
          />

            <Image
                source={require('../assets/Logo-FDP.jpg')}
                style={styles.image}
            />

            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Usuario"/>

            <TextInput style={styles.inputs} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="Contraseña"/>
            {mensajePasswordInvalida !== "" && <Text style={styles.errors}>{mensajePasswordInvalida}</Text>}

            <TextInput style={styles.inputs} onChangeText={setPassword2} value={password2} secureTextEntry={true} placeholder="Confirmar contraseña"/>
            {mensajePasswordDiferentes != "" && <Text style={styles.errors}>{mensajePasswordDiferentes}</Text>}

            <Button
                onPress={() => {
                    // Se vacian los campos de mensajes 
                    setMensajeCamposVacios('')
                    setMensajePasswordInvalida('')
                    setMensajePasswordDiferentes('')

                    //Comprobaciones
                    if (user.trim() === '' || password.trim() === '' || password2.trim() === '') {
                        // Ningun campo vacio
                        setMensajeCamposVacios('Uno o más campos están vacíos')
                    } else if (password.length < 6) {
                        // Contraseña valida
                        setMensajePasswordInvalida('Longitud mínima de la contraseña: 6 caracteres')
                    } else if (password !== password2) {
                        // Confirmar contraseña correcto
                        setMensajePasswordDiferentes('Las contraseñas no son iguales');
                    } else {
                        Alert.alert('Registro correcto', 'El registro de usuario se ha realizado correctamente')
                    }
                }}
                title='Registrarse'
                accessibilityLabel='Registrarse'
                color={styles.buttons.color}
            />
            {mensajeCamposVacios != "" && <Text style={styles.errors}>{"\n"+mensajeCamposVacios}</Text>}
        </View>
    );
}

export default Register