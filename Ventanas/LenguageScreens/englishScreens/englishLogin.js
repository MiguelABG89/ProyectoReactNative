import React from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image } from "react-native";
import styles from '../estilos/estilos'

function EnglishLogin({ navigation }) {
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
                placeholder="E-mail"
            />

            <TextInput
                style={styles.inputs}
                onChangeText={onChangePwd}
                value={pwd}
                placeholder="Password"

            />

            <Text style={styles.text}>
                I forgot my{" "}
                {/**cambiar navegación a la nueva ventana en inglés */}
                <Text style={styles.linkableText} onPress={() => navigation.navigate('Recuperar Contrasena', { name: 'Recuperar Contrasena' })}>
                    password
                </Text>
            </Text>


            <Button
                color={styles.buttons.color}
                title="Log in"
                onPress={() => Alert.alert('Navegación --> Pagina de inicio')} />

            <Text style={styles.text}>Do you need an account?</Text>

            {/**cambiar navegación a la nueva ventana en inglés */}
            <Text style={styles.linkableText} onPress={() => navigation.navigate('Registrar', { name: 'Registrar' })}>Register</Text>

        </SafeAreaView>
    );
}

export default EnglishLogin;