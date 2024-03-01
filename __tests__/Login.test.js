import React from 'react';
import {render,fireEvent} from '@testing-library/react-native';
import Login from '../Ventanas/spanishScreens/spanishLogin'

describe('Login Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    // Verifica que los elementos esenciales estén presentes
    expect(getByPlaceholderText('Correo electrónico')).toBeDefined();
    expect(getByPlaceholderText('Contraseña')).toBeDefined();
    expect(getByText('Iniciar sesión')).toBeDefined();
    expect(getByText('Cerrar sesión')).toBeDefined();
    expect(getByText('¿Necesitas una cuenta?')).toBeDefined();
    expect(getByText('Registrar')).toBeDefined();
  });

  it('handles user input correctly', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');

    // Simula la entrada del usuario
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Verifica que los valores del estado se actualicen correctamente
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('handles sign in and sign out correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    const signInButton = getByText('Iniciar sesión');
    const signOutButton = getByText('Cerrar sesión');

    // Simula la entrada del usuario
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Simula el inicio de sesión
    await fireEvent.press(signInButton);

    // Verifica que la navegación se realice correctamente después del inicio de sesión
    // Aquí puedes ajustar según cómo manejes la navegación en tu aplicación
    // Puedes utilizar mocks o spies para asegurarte de que la función de navegación se llame correctamente

    // Simula el cierre de sesión
    fireEvent.press(signOutButton);

    // Verifica que la función de cierre de sesión se llame correctamente
    // Puedes utilizar mocks o spies para asegurarte de que la función se llame correctamente
  });
});