import React from "react";
import { Button, View, TextInput, Image, Alert, Text, TouchableOpacity } from "react-native";
import styles from '../estilos/estilos'

const EnglishPassword = () => {
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
                Please enter your e-mail. We will send you instructions to reset your password.
            </Text>

            <TextInput
                style={styles.inputs}
                onChangeText={onChangeText}
                value={text}
                placeholder="E-mail"
            />

            <Button
                color={styles.buttons.color}
                title="Recover password"
                onPress={() => {
                    Alert.alert('An email has been sent to the following address:', `${text}`);
                }}
            />

        </View>

    );
};

export default EnglishPassword;