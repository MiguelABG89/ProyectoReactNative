import React from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image } from "react-native";
import styles from '../estilos/estilos'

function FrenchLogin({ navigation }) {
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
                placeholder="Courrier électronique"
            />

            <TextInput
                style={styles.inputs}
                onChangeText={onChangePwd}
                value={pwd}
                placeholder="Mot de passe"

            />

            <Text style={styles.text}>
                J'ai oublié mon{" "}
                <Text style={styles.linkableText} onPress={() => navigation.navigate('Recuperar Contrasena', { name: 'Recuperar Contrasena' })}>
                    mot de passe
                </Text>
            </Text>


            <Button
                color={styles.buttons.color}
                title="connecter"
                onPress={() => Alert.alert('Navegación --> Pagina de inicio')} />

            <Text style={styles.text}>Avez-vous besoin d'un compte?</Text>

            <Text style={styles.linkableText} onPress={() => navigation.navigate('Registrar', { name: 'Registrar' })}>Registre</Text>

        </SafeAreaView>
    );
}

export default FrenchLogin;