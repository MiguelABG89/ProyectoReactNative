import { useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from '../estilos/estilos'


function EnglishRegister() {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [mensajeCamposVacios, setMensajeCamposVacios] = useState("")
    const [mensajePasswordInvalida, setMensajePasswordInvalida] = useState("")
    const [mensajePasswordDiferentes, setMensajePasswordDiferentes] = useState("")


    return (
        <View style={styles.estructure}>
            {/* LOGO AQUI */}

            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="E-mail"/>

            {/* Boton para ocultar */}
            <TextInput style={styles.inputs} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="Password"/>
            <Text style={styles.errors}>{mensajePasswordInvalida}</Text>

            {/* Boton para ocultar */}
            <TextInput style={styles.inputs} onChangeText={setPassword2} value={password2} secureTextEntry={true} placeholder="Confirm password"/>
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
            <Text style={styles.errors}>{"\n"+mensajeCamposVacios}</Text>
        </View>
    );
}

export default EnglishRegister