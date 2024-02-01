import React,{useState} from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image } from "react-native";
import styles from '../estilos/estilos'
import { Authenticator } from "@aws-amplify/ui-react-native";


function Login({ navigation }) {
    const [Usu, onChangeUsu] = useState('');
    const [pwd, onChangePwd] = useState('');
    const [var1, setVar1] = useState('');

    const onSignInPressed = async (data) => {
        const response = await Authenticator.SignIn(data.Usu, data.pwd);
        Alert.alert("entro")
        console.log(response);
        setVar1(response);
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
                onPress={onSignInPressed(Usu,pwd)} />

            <Text style={styles.text}>¿Necesitas una cuenta?</Text>

            <Text style={styles.linkableText} onPress={() => navigation.navigate('Registrar', { name: 'Registrar' })}>Registrar</Text>

        </SafeAreaView>
    );
}

export default Login;