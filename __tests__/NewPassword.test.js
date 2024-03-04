import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NewPassword from '../Ventanas/spanishScreens/spanishNewPassword';

describe('NewPassword component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<NewPassword />);
    
    // Verifica que algunos elementos estén presentes en el componente
    expect(getByText('Restablecer la contraseña')).toBeTruthy();
    expect(getByText('Por favor, introduzca el código recibido y su nueva contraseña.')).toBeTruthy();
    expect(getByPlaceholderText('Código')).toBeTruthy();
    expect(getByPlaceholderText('Nueva contraseña')).toBeTruthy();
    expect(getByPlaceholderText('Confirmar contraseña')).toBeTruthy();
    expect(getByTestId('togglePassword1')).toBeTruthy();
    expect(getByTestId('togglePassword2')).toBeTruthy();
    expect(getByText('Recuperar contraseña')).toBeTruthy();
  });

  test('handles password reset with valid input', async () => {
    const { getByText, getByPlaceholderText } = render(<NewPassword />);
    
    // Simula la entrada de datos válidos
    fireEvent.changeText(getByPlaceholderText('Código'), '123456');
    fireEvent.changeText(getByPlaceholderText('Nueva contraseña'), 'newpassword');
    fireEvent.changeText(getByPlaceholderText('Confirmar contraseña'), 'newpassword');
    
    // Simula el clic en el botón de restablecimiento de contraseña
    fireEvent.press(getByText('Recuperar contraseña'));

    // Espera a que la alerta de éxito aparezca
    await waitFor(() => expect(getByText('Exito')).toBeTruthy());
  });

  // Agrega más pruebas según sea necesario para cubrir otros casos y condiciones.
});