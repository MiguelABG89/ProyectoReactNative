import React from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../estilos/estilos'

const FrenchRecuperarContrasena = () => {
    const [text, onChangeText] = React.useState('');

    return (

        <View style={styles.estructure}>

            <Text style={styles.titles}>
                Restablecer la contraseña
            </Text>

            <Image
                source={require('../assets/candado.png')}
                style={styles.image}
            />

            <Text style={styles.text}>
                Veuillez entrer votre e-mail. Nous vous enverrons des instructions pour réinitialiser votre mot de passe.
            </Text>

            <TextInput
                style={styles.inputs}
                onChangeText={onChangeText}
                value={text}
                placeholder="Courrier électronique"
            />

            <Button
                color={styles.buttons.color}
                title="Récupérer le mot de passe"
                onPress={() => {
                    Alert.alert('Un email a été envoyé à l´adresse suivante :', `${text}`);
                }}
            />

        </View>

    );
};

export default FrenchRecuperarContrasena;