import React,{useState}from "react";
import { SafeAreaView, Text, Button, TextInput, Alert, Image } from "react-native";
import styles from '../../../estilos/estilos'
import ModalDropdown from 'react-native-modal-dropdown';


function FrenchLogin({ navigation }) {
    const [Usu, onChangeUsu] = React.useState('');
    const [pwd, onChangePwd] = React.useState('');
    
    const [selectedLanguage, setSelectedLanguage] = useState("Sélectionnez une langue");
    const languages = [
        'Español',
        'English',
        'Français',
        'deutsch',
        '中国人'];


    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente correspondiente al idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Inicio', { name: 'Inicio' })
                break;
            case 'English':
                navigation.navigate('Login', { name: 'Login' })
                break;
            case 'Français':
                navigation.navigate('Connecter', { name: 'Connecter' })
                break;
            default:
                navigation.navigate('Connecter', { name: 'Connecter' })
        }
    };

    return (
        < SafeAreaView style={styles.estructure} >

            <ModalDropdown
                // El valor inicial no es considerado una opcion de la lista y salta un mini error
                options={languages}
                defaultValue={selectedLanguage}
                onSelect={handleLanguageSelect}
            />

            <Image
                source={require('../../../assets/Logo-FDP.jpg')} // Ajusta la ruta según la ubicación de tu imagen
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
                <Text style={styles.linkableText} onPress={() => navigation.navigate('Récupérer mot de passe', { name: 'Récupérer mot de passe' })}>
                    mot de passe

                </Text>
            </Text>


            <Button
                color={styles.buttons.color}
                title="connecter"
                onPress={() => Alert.alert('Navegación --> Pagina de inicio')} />

            <Text style={styles.text}>Avez-vous besoin d'un compte?</Text>

            <Text style={styles.linkableText} onPress={() => navigation.navigate('Registre', { name: 'Registre' })}>Registre</Text>

        </SafeAreaView >
    );
}

export default FrenchLogin;