import React from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image } from "react-native";
import styles from '../estilos/estilos'

function Login({ navigation }) {
    const [Usu, onChangeUsu] = React.useState('');
    const [pwd, onChangePwd] = React.useState('');

    return (
        <SafeAreaView style={styles.estructure}>

            <Image
                source={require('../assets/Logo-FDP.jpg')} // Ajusta la ruta según la ubicación de tu imagen
                style={styles.image}
            />

            <TextInput
                style={styles.inputs}
                onChangeText={onChangeUsu}
                value={Usu}
                placeholder="Correo electrónico"
            />

            <TextInput
                style={styles.inputs}
                onChangeText={onChangePwd}
                value={pwd}
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
                title="iniciar sesion"
                onPress={() => Alert.alert('Navegación --> Pagina de inicio')} />

            <Text style={styles.text}>¿Necesitas una cuenta?</Text>

            <Text style={styles.linkableText} onPress={() => navigation.navigate('Registrar', { name: 'Registrar' })}>Registrar</Text>

            {/**Tienes que buscar como hacer el estilo del Registrar */}

        </SafeAreaView>
    );
}

export default Login;