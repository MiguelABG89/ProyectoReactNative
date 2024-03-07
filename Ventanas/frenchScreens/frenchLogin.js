import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Text, Button, TextInput, Alert, Image, KeyboardAvoidingView, ScrollView, View } from "react-native";
import styles from '../../estilos/estilos';
import { Auth } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';

function FrenchLogin({ navigation }) {
    // Estados para el usuario y contraseña
    const [Usu, onChangeUsu] = useState('');
    const [pwd, onChangePwd] = useState('');

    // Estado y función para cambiar la visibilidad de la contraseña
    const [showPwd1, setShowPwd1] = React.useState(true);
    const toggleShowPassword1 = () => setShowPwd1(!showPwd1);

    // Efecto para limpiar los campos de usuario y contraseña al cambiar de pantalla
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            onChangeUsu('');
            onChangePwd('');
        });

        return unsubscribe;
    }, [navigation]);

    // Función para manejar el inicio de sesión
    async function handleSingIn() {
        const username = Usu;
        const password = pwd;

        try {
            navigation.navigate("Majeur")
            const { isSignedIn, nextStep } = await signIn({
                username, password,
                options: { authFlowType: "USER_PASSWORD_AUTH" }
            })
            console.log('success')
            navigation.navigate("Connecter")
        } catch (e) {
            Alert.alert('Login', 'Email ou mot de passe incorrect')
            console.log('error singing in')
        }
    }

    // Función para cerrar sesión
    async function handleSignOut() {
        try {
            await signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    // Renderización del componente
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <SafeAreaView style={styles.estructure}>

                    {/* Logo */}
                    <Image
                        source={require('../../assets/Logo-FDP.jpg')}
                        style={styles.image}
                    />

                    {/* Input para el correo electrónico */}
                    <TextInput
                        style={styles.inputs}
                        onChangeText={nextUsu => onChangeUsu(nextUsu)}
                        defaultValue={Usu}
                        placeholder="Courrier électronique"
                    />

                    {/* Input para la contraseña */}
                    <View style={styles.viewOjo}>
                        <TextInput
                            style={styles.inputPwd}
                            onChangeText={nextPwd => onChangePwd(nextPwd)}
                            defaultValue={pwd}
                            placeholder="Mot de passe"
                            secureTextEntry={showPwd1}
                        />
                        <TouchableOpacity onPress={toggleShowPassword1} style={styles.touchableOjo}>
                            <Image
                                source={showPwd1 ? require('../../assets/ojoOff.png') : require('../../assets/ojoOn.png')}
                                style={styles.imageOjo}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Texto para recuperar contraseña */}
                    <Text style={styles.text}>
                        J'ai oublié mon{" "}
                        <Text style={styles.linkableText} onPress={() => navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' })}>
                            mot de passe
                        </Text>
                    </Text>

                    {/* Botones para iniciar/cerrar sesión */}
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Commencer la session"
                        onPress={handleSingIn}
                    />
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Fermer la session"
                        onPress={handleSignOut}
                    />

                    {/* Texto para registrarse */}
                    <Text style={styles.text}>Avez-vous besoin d'un compte ?</Text>
                    <Text style={styles.linkableText} onPress={() => navigation.navigate('Registre', { name: 'Registre' })}>Enregistrer</Text>

                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default FrenchLogin;