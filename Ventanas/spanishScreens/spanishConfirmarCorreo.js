import { useState } from 'react';
import { TextInput, View, Button, Alert, Image } from 'react-native';
import styles from '../../estilos/estilos';
import { confirmSignUp } from 'aws-amplify/auth';

// Componente para confirmar el correo electrónico
function ConfirmarCorreo({ navigation }) {
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
            navigation.navigate("Inicio")
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
            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Usuario" />
            <TextInput style={styles.inputs} onChangeText={setCode} value={code} placeholder="Codigo" />

            {/* Botón para confirmar */}
            <Button
                onPress={handleSignUpConfirmation}
                title='Confirmar'
                accessibilityLabel='Confirmar'
                color={styles.buttons.color}
            />
        </View>
    );
}

export default ConfirmarCorreo