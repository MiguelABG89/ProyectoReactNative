import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import styles from '../../estilos/estilos'
import { confirmSignUp } from 'aws-amplify/auth'

// Componente para confirmar el correo electrónico
function FrenchConfirmMail({ navigation }) {
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
            navigation.navigate("Connecter")
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
            <Text style={styles.text}>
            Veuillez entrer votre nom d'utilisateur et le code reçu dans votre courrier électronique.
            </Text>
            {/* Inputs para el usuario y el código */}
            <TextInput style={styles.inputs} onChangeText={setUser} value={user} placeholder="Utilisateur" />
            <TextInput style={styles.inputs} onChangeText={setCode} value={code} placeholder="Code" />

            {/* Botón para confirmar */}
            <Button
                onPress={handleSignUpConfirmation}
                title='Confirmer'
                accessibilityLabel='Confirmer'
                color={styles.buttons.color}
            />
        </View>
    );
}

export default FrenchConfirmMail