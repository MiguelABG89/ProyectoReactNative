// import { useState } from 'react';
// import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
// import ModalDropdown from 'react-native-modal-dropdown';
// import styles from '../estilos/estilos'
// import {signOut} from 'aws-amplify/auth'
// import { get } from 'aws-amplify/api';

// function HomeScreen({ navigation }) {
//     const [selectedLanguage, setSelectedLanguage] = useState("Seleccione un idioma");
//     const languages = [
//         'Español',
//         'English',
//         'Français',
//         'deutsch',
//         '中国人'
//     ];

//     const [user, setUser] = useState("");
//     const [code, setCode] = useState("");
//     const [apiResponse, setApiResponse] = useState(""); // Nuevo estado para almacenar la respuesta de la API

//     const handleLanguageSelect = (index, value) => {
//         setSelectedLanguage(value);

//         // Navegar al componente correspondiente al idioma seleccionado
//         switch (value) {
//             case 'Español':
//                 navigation.navigate('Register');
//                 break;
//             case 'English':
//                 navigation.navigate('englishRegister');
//                 break;
//             case 'Français':
//                 navigation.navigate('frenchRegister');
//                 break;
//             default:
//                 navigation.navigate('Register'); // Por defecto, regresa a Español
//         }
//     };

//     async function getTodo() {
//         try {
//             const restOperation = await get({ 
//                 apiName: 'ProyectoReactNative',
//                 path: '/hello'
//             });
    
//             const { body } = await restOperation.response;
//             const responseData = await body.json();
            
//             // Convierte el objeto a cadena de texto
//             const responseString = JSON.stringify(responseData);
    
//             setApiResponse(responseString); // Almacena la respuesta en el estado
//             console.log('GET call succeeded: ', responseData);
//         } catch (error) {
//             console.log('GET call failed: ', error);
//         }
//     }

//     async function handleSignOut() {
//         try {
//           await signOut();
//           navigation.navigate("Inicio");
//         } catch (error) {
//           console.log('error signing out: ', error);
//         }
//     }

//     return (
//         <View style={styles.estructure}>

//             <ModalDropdown
//                 options={languages}
//                 defaultValue={selectedLanguage}
//                 onSelect={handleLanguageSelect}
//             />

//             <Image
//                 source={require('../assets/Logo-FDP.jpg')}
//                 style={styles.image}
//             />

//             <Button
//                 color={styles.buttons.color}
//                 title="Llamar api"
//                 onPress={getTodo} 
//             />

//             {/* Muestra la respuesta de la API en el componente Text */}
//             <Text>{apiResponse}</Text>

//             <Button
//                 color={styles.buttons.color}
//                 title="Cerrar sesión"
//                 onPress={handleSignOut} 
//             />
            
//         </View>
//     );
// }

// export default HomeScreen;
import { useState } from 'react';
import { Text, TextInput, View, Button, Alert, Image, navigation } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../estilos/estilos';
import { signOut } from 'aws-amplify/auth';
import { get } from 'aws-amplify/api';

function HomeScreen({ navigation }) {
    const [selectedLanguage, setSelectedLanguage] = useState("Seleccione un idioma");
    const languages = ['Español', 'English', 'Français', 'deutsch', '中国人'];

    const [user, setUser] = useState("");
    const [code, setCode] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [inputValue, setInputValue] = useState(""); // Nuevo estado para almacenar el valor del input

    const handleLanguageSelect = (index, value) => {
        setSelectedLanguage(value);

        // Navegar al componente correspondiente al idioma seleccionado
        switch (value) {
            case 'Español':
                navigation.navigate('Register');
                break;
            case 'English':
                navigation.navigate('englishRegister');
                break;
            case 'Français':
                navigation.navigate('frenchRegister');
                break;
            default:
                navigation.navigate('Register'); // Por defecto, regresa a Español
        }
    };

    async function getTodo() {
        try {
            const restOperation = await get({
                apiName: 'ProyectoReactNative',
                path: '/centros'
            });

            const { body } = await restOperation.response;
            const responseData = await body.json();

            const responseString = JSON.stringify(responseData);

            setApiResponse(responseString);
            console.log('GET call succeeded: ', responseData);
        } catch (error) {
            console.log('GET call failed: ', error);
        }
    }

    async function getTodoWithParams() {
        try {
            const restOperation = await get({
                apiName: 'ProyectoReactNative',
                path: '/items',
                // Pasar parámetros a la API
                options:{

                    queryParams: {
                        param: inputValue
                    }
                }
            });

            const { body } = await restOperation.response;
            const responseData = await body.json();

            const responseString = JSON.stringify(responseData);

            setApiResponse(responseString);
            console.log('GET call with params succeeded: ', responseData);
        } catch (error) {
            console.log('GET call with params failed: ', error);
        }
    }

    async function handleSignOut() {
        try {
            await signOut();
            navigation.navigate("Inicio");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <View style={styles.estructure}>
            <ModalDropdown
                options={languages}
                defaultValue={selectedLanguage}
                onSelect={handleLanguageSelect}
            />

            <Image
                source={require('../assets/Logo-FDP.jpg')}
                style={styles.image}
            />

            <Button
                color={styles.buttons.color}
                title="Llamar API"
                onPress={getTodo}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingrese parámetro"
                onChangeText={(text) => setInputValue(text)}
                value={inputValue}
            />

            <Button
                color={styles.buttons.color}
                title="Llamar API con parámetros"
                onPress={getTodoWithParams}
            />

            <Text>{apiResponse}</Text>

            <Button
                color={styles.buttons.color}
                title="Cerrar sesión"
                onPress={handleSignOut}
            />
        </View>
    );
}

export default HomeScreen;
