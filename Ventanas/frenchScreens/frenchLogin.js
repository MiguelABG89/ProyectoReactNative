import React, { useState } from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image } from "react-native";
import styles from '../../estilos/estilos'
import ModalDropdown from 'react-native-modal-dropdown';
import { signIn, signOut } from 'aws-amplify/auth';

function FrenchLogin({ navigation }) {
    const [Usu, onChangeUsu] = React.useState('');
    const [pwd, onChangePwd] = React.useState('');

    async function handleSingIn() {
        const username = Usu;
        const password = pwd;
        try {
            const { isSignedIn, nextStep } = await signIn({
                username, password,
                options: { authFlowType: "USER_PASSWORD_AUTH" }
            })
            console.log('success')
            navigation.navigate("Home")
        } catch (e) {
            console.log('error singing in')
        }
    }
    async function handleSignOut() {
        try {
            await signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const [selectedLanguage, setSelectedLanguage] = useState("Sélectionnez une langue");
    const languages = [
        'Español',
        'English',
        'Français',
        'Deutsch',
        '中国人'];


    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage("Français");

        // Navegar al componente correspondiente al idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Inicio', { name: 'Inicio' })
                break;
            case 'English':
                navigation.navigate('Login', { name: 'Login' })
                break;
            case 'Français':
                navigation.navigate('Connecter', { name: 'Connecter' })
                break;
            case 'Deutsch':
                navigation.navigate('Registrieren', { name: 'Registrieren' });
                break;
            default:
                navigation.navigate('Connecter', { name: 'Connecter' })
        }
    };

    return (
        < SafeAreaView style={styles.estructure} >

            {/* Menú desplegable de idiomas */}
            <ModalDropdown
                // El valor inicial no es considerado una opcion de la lista y salta un mini error
                options={languages}
                defaultValue={selectedLanguage}
                onSelect={handleLanguageSelect}
            />

            {/* Imagen logo FP2 */}
            <Image
                source={require('../../assets/Logo-FDP.jpg')} // Ajusta la ruta según la ubicación de tu imagen
                style={styles.image}
            />

            {/* Campo USUARIO */}
            <TextInput
                style={styles.inputs}
                onChangeText={nextUsu => onChangeUsu(nextUsu)}
                defaultValue={Usu}
                placeholder="Courrier électronique"
            />

            {/* Campo CONTRASEÑA */}
            <TextInput
                style={styles.inputs}
                onChangeText={nextPwd => onChangePwd(nextPwd)}
                defaultValue={pwd}
                placeholder="Mot de passe"

            />

            {/* RECUPERAR CONTRASEÑA */}
            <Text style={styles.text}>
                J'ai oublié mon{" "}
                <Text style={styles.linkableText} onPress={() => navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' })}>
                    mot de passe
                </Text>
            </Text>

            {/* Botón para iniciar sesión */}
            <Button
                color={styles.buttons.color}
                style={{ margin: styles.buttons.margin }}
                title="Connecter"
                onPress={handleSingIn} />

            {/* Botón para cerrar sesión */}
            <Button
                color={styles.buttons.color}
                style={{ margin: styles.buttons.margin }}
                title="Fermer la sessionF"
                onPress={handleSignOut} />


            {/* Crear nueva cuenta */}
            <Text style={styles.text}>Avez-vous besoin d'un compte?</Text>

            <Text style={styles.linkableText} onPress={() => navigation.navigate('Registre', { name: 'Registre' })}>Registre</Text>

        </SafeAreaView >
    );
}

export default FrenchLogin;