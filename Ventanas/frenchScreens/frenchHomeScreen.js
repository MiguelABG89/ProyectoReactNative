import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import styles from '../../estilos/estilos'
import { signOut } from 'aws-amplify/auth'
import { get } from 'aws-amplify/api';

// Componente para mostrar la pantalla principal
function FrenchHomeScreen({ navigation }) {
    // Función para obtener información de la API
    async function getTodo() {
        try {
            const restOperation = get({
                apiName: 'ProyectoReactNative',
                path: '/items',
                options: {
                    queryParams: {
                        id: '1234'
                    }
                }
            });
            const { body } = await restOperation.response;
            const str = await body.json();

            console.log('GET call succeeded: ', str);
        } catch (error) {
            console.log('GET call failed: ', error);
        }
    }

    // Función para cerrar sesión
    async function handleSignOut() {
        try {
            await signOut();
            navigation.navigate("Connecter")
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    // Renderización del componente
    return (
        <View style={styles.estructure}>

            {/* Logo */}
            <Image
                source={require('../../assets/Logo-FDP.jpg')}
                style={styles.image}
            />

            {/* Botones para llamar a la API y cerrar sesión */}
            <Button
                color={styles.buttons.color}
                title="Appeler l'API"
                onPress={getTodo}
            />
            <Button
                color={styles.buttons.color}
                title="Fermer la session"
                onPress={handleSignOut}
            />
        </View>
    );
}

export default FrenchHomeScreen