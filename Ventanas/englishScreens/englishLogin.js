import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Text, Button, TextInput, Alert, Image, KeyboardAvoidingView, ScrollView, View } from "react-native";
import styles from '../../estilos/estilos';
import { Auth } from 'aws-amplify';
import { signIn, signOut } from 'aws-amplify/auth';

function EnglishLogin({ navigation }) {
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
            const { isSignedIn, nextStep } = await signIn({
                username, password,
                options: { authFlowType: "USER_PASSWORD_AUTH" }
            })
            console.log('success')
            navigation.navigate("Home")
        } catch (e) {
            Alert.alert('Log in', 'Incorrect email or password')
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
                        placeholder="Email"
                    />

                    {/* Input para la contraseña */}
                    <View style={styles.viewOjo}>
                        <TextInput
                            style={styles.inputPwd}
                            onChangeText={nextPwd => onChangePwd(nextPwd)}
                            defaultValue={pwd}
                            placeholder="Password"
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
                        I forgot my{" "}
                        <Text style={styles.linkableText} onPress={() => navigation.navigate('Recover password', { name: 'Recover password' })}>
                            password
                        </Text>
                    </Text>

                    {/* Botones para iniciar/cerrar sesión */}
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Log in"
                        onPress={handleSingIn}
                    />
                    <Button
                        color={styles.buttons.color}
                        style={{ margin: styles.buttons.margin }}
                        title="Log out"
                        onPress={handleSignOut}
                    />

                    {/* Texto para registrarse */}
                    <Text style={styles.text}>Don´t have an account?</Text>
                    <Text style={styles.linkableText} onPress={() => navigation.navigate('Register', { name: 'Register' })}>Sign up</Text>

                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default EnglishLogin;
