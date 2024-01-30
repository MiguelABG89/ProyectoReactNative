import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecuperarContrasena from '../Ventanas/recuperarContrasena';


describe('RecuperarContrasena component', () => {
    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<RecuperarContrasena />);

        // Verifica si ciertos elementos están presentes en el componente renderizado
        expect(getByText('Restablecer la contraseña')).toBeTruthy();
        expect(getByText('Por favor, introduzca su dirección de correo. Le enviaremos las instrucciones para restablecer su contraseña.')).toBeTruthy();
        expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
        expect(getByText('Recuperar contraseña')).toBeTruthy();
    });

    it('triggers Alert on button press', () => {
        const { getByText, getByPlaceholderText } = render(<RecuperarContrasena />);
        const emailInput = getByPlaceholderText('Correo electrónico');
        const button = getByText('Recuperar contraseña');

        // Simula la entrada del usuario
        fireEvent.changeText(emailInput, 'ejemplo@correo.com');

        // Simula el clic en el botón
        fireEvent.press(button);
    });
});
