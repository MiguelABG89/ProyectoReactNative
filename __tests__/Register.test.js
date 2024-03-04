import React from 'react';
import {render,fireEvent} from '@testing-library/react-native';
import Register from '../Ventanas/spanishScreens/spanishRegister';

describe('Register component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<Register />);
    
    // Verifica que algunos elementos estén presentes en el componente
    expect(getByText('Registrarse')).toBeTruthy();
    expect(getByPlaceholderText('Usuario')).toBeTruthy();
    expect(getByPlaceholderText('Correo')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByPlaceholderText('Confirmar contraseña')).toBeTruthy();
    expect(getByTestId('togglePassword1')).toBeTruthy();
    expect(getByTestId('togglePassword2')).toBeTruthy();
  });

  test('handles registration with valid input', async () => {
    const { getByText, getByPlaceholderText } = render(<Register />);
    
    // Simula la entrada de datos válidos
    fireEvent.changeText(getByPlaceholderText('Usuario'), 'testUser');
    fireEvent.changeText(getByPlaceholderText('Correo'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password');
    fireEvent.changeText(getByPlaceholderText('Confirmar contraseña'), 'password');
    
    // Simula el clic en el botón de registro
    fireEvent.press(getByText('Registrarse'));

    // Espera a que la alerta de registro correcto aparezca
    await waitFor(() => expect(getByText('Registro correcto')).toBeTruthy());
  });

  // Agrega más pruebas según sea necesario para cubrir otros casos y condiciones.
});