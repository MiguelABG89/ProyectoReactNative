import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import styles from '../../estilos/estilos'
import { confirmSignUp } from 'aws-amplify/auth'

// Componente para confirmar el correo electrónico
function EnglishConfirmarCorreo({ navigation }) {
    // Estados para el usuario y código de confirmación
    const [user, setUser] = useState("")
    const [code, setCode] = useState("")

    // Maneja la confirmación del registro
    async function handleSignUpConfirmation() {
        const username = user;
        const codeConfirm = code;
        try {
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: username,
                confirmationCode: codeConfirm
            });
            navigation.navigate("Login")
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    // Renderización del componente
    return (
        <View style={styles.estructure}>

            {/* Logo */}
            <Image
                source={require('../../assets/Logo-FDP.jpg')}
                style={styles.image}
            />

            {/* Inputs para el usuario y el código */}
            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="User" />
            <TextInput style={styles.inputs} onChangeText={setCode} value={code} placeholder="Code" />

            {/* Botón para confirmar */}
            <Button
                onPress={handleSignUpConfirmation}
                title='Confirm'
                accessibilityLabel='Confirm'
                color={styles.buttons.color}
            />
        </View>
    );
}

export default EnglishConfirmarCorreo