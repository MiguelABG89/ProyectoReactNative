import { useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from '../estilos/estilos'


function FrenchRegister() {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [mensajeCamposVacios, setMensajeCamposVacios] = useState("")
    const [mensajePasswordInvalida, setMensajePasswordInvalida] = useState("")
    const [mensajePasswordDiferentes, setMensajePasswordDiferentes] = useState("")


    return (
        <View style={styles.estructure}>
            {/* LOGO AQUI */}

            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Courrier électronique"/>

            {/* Boton para ocultar */}
            <TextInput style={styles.inputs} onChangeText={setPassword} value={password} secureTextEntry={true} placeholder="Mot de passe"/>
            <Text style={styles.errors}>{mensajePasswordInvalida}</Text>

            {/* Boton para ocultar */}
            <TextInput style={styles.inputs} onChangeText={setPassword2} value={password2} secureTextEntry={true} placeholder="Confirmer mot de passe"/>
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
                        setMensajeCamposVacios('Un ou plusieurs champs sont vides')
                    } else if (password.length < 6) {
                        // Contraseña valida
                        setMensajePasswordInvalida('Longueur minimale du mot de passe : 6 caractères')
                    } else if (password !== password2) {
                        // Confirmar contraseña correcto
                        setMensajePasswordDiferentes('Les mots de passe ne correspondent pas');
                    } else {
                        Alert.alert('Inscription réussie', 'L´inscription de l´utilisateur a réussi')
                    }
                }}
                title='Enregistrement'
                accessibilityLabel='Enregistrement'
                color={styles.buttons.color}
            />
            <Text style={styles.errors}>{"\n"+mensajeCamposVacios}</Text>
        </View>
    );
}

export default FrenchRegister