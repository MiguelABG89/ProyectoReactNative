import React,{useState} from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image } from "react-native";
import styles from '../estilos/estilos'
import {Auth} from 'aws-amplify'
import {signIn,signOut} from 'aws-amplify/auth'


function Login({ navigation }) {
    const [Usu, onChangeUsu] = useState('');
    const [pwd, onChangePwd] = useState('');
    

    // const onSignInPressed = async (data) => {
    //     const response = await Authenticator.SignIn(data.Usu, data.pwd);
    //     Alert.alert("entro")
    //     console.log(response);
    //     setVar1(response);
    // }

    async function handleSingIn(){
        const username = Usu;
        const password = pwd;
        try{
            const { isSignedIn, nextStep } = await signIn({ username , password ,
            options:{authFlowType:"USER_PASSWORD_AUTH"}})
            console.log('success')
        }catch(e){
            console.log('error singing in', e)
        }
    }

    async function handleSignOut() {
        try {
          await signOut();
        } catch (error) {
          console.log('error signing out: ', error);
        }
      }
    return (
        <SafeAreaView style={styles.estructure}>

            <Image
                source={require('../assets/Logo-FDP.jpg')} // Ajusta la ruta según la ubicación de tu imagen
                style={styles.image}
            />

            <TextInput
                style={styles.inputs}
                onChangeText={nextUsu => onChangeUsu(nextUsu)}
                defaultValue={Usu}
                placeholder="Correo electrónico"
            />

            <TextInput
                style={styles.inputs}
                onChangeText={nextPwd => onChangePwd(nextPwd)}
                defaultValue={pwd}
                placeholder="Contraseña"

            />

            <Text style={styles.text}>
                He olvidado mi{" "}
                <Text style={styles.linkableText} onPress={() => navigation.navigate('Recuperar Contrasena', { name: 'Recuperar Contrasena' })}>
                    contraseña
                </Text>
            </Text>


            <Button
                color={styles.buttons.color}
                title="iniciar sesión"
                onPress={handleSingIn} />

            <Button
                color={styles.buttons.color}
                title="Cerrar sesión"
                onPress={handleSignOut} />

            <Text style={styles.text}>¿Necesitas una cuenta?</Text>

            <Text style={styles.linkableText} onPress={() => navigation.navigate('Registrar', { name: 'Registrar' })}>Registrar</Text>

        </SafeAreaView>
    );
}

export default Login;