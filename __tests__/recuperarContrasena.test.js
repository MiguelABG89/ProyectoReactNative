import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RecuperarContrasena from '../Ventanas/recuperarContrasena';

describe('RecuperarContrasena component', () => {

    // -------------------------- MOSTRAR ELEMENTOS CORRECTAMENTE --------------------------
    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<RecuperarContrasena />);

        // Verifica si ciertos elementos están presentes en el componente renderizado
        expect(getByText('Restablecer la contraseña')).toBeTruthy();
        expect(getByText('Por favor, introduzca su dirección de correo. Le enviaremos las instrucciones para restablecer su contraseña.')).toBeTruthy();
        expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
        expect(getByText('Recuperar contraseña')).toBeTruthy();
    });

    // -------------------------- EMAIL CORRECTO Y PULSAR BOTÓN --------------------------
    it('triggers Alert on button press', () => {
        const { getByText, getByPlaceholderText } = render(<RecuperarContrasena />);
        const emailInput = getByPlaceholderText('Correo electrónico');
        const button = getByText('Recuperar contraseña');

        // Simula la entrada del usuario
        fireEvent.changeText(emailInput, 'ejemplo@correo.com');

        // Simula el clic en el botón
        fireEvent.press(button);
    });

    // -------------------------- EMAIL VACÍO Y PULSAR BOTÓN --------------------------
    it('handles empty input and shows error message', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<RecuperarContrasena />);

        // Selecciona el input de correo electrónico
        const emailInput = getByPlaceholderText('Correo electrónico');

        // Deja el input en blanco
        fireEvent.changeText(emailInput, '');

        // Selecciona el botón de recuperación
        const recoveryButton = getByText('Recuperar contraseña');

        // Simula el clic en el botón de recuperación
        fireEvent.press(recoveryButton);

        // Espera a que se ejecute la validación y se muestre el mensaje de error
        expect(getByText('El campo no debe estar vacío.')).toBeTruthy();
    });

    // -------------------------- EMAIL SIN @ Y PULSAR BOTÓN --------------------------
    it('handles invalid email and shows error message', async () => {
        const { getByText, getByPlaceholderText, getByTestId } = render(<RecuperarContrasena />);

        // Selecciona el input de correo electrónico
        const emailInput = getByPlaceholderText('Correo electrónico');

        // Introduce un correo sin '@'
        fireEvent.changeText(emailInput, 'invalid-email');

        // Selecciona el botón de recuperación
        const recoveryButton = getByText('Recuperar contraseña');

        // Simula el clic en el botón de recuperación
        fireEvent.press(recoveryButton);

        // Espera a que se ejecute la validación y se muestre el mensaje de error
        expect(getByText('El email debe contener un \'@\'')).toBeTruthy();
    });
});