import React from 'react';
import {render,fireEvent} from '@testing-library/react-native';
import Login from '../Ventanas/Login';

describe('Login Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Login />);

    // Verifica que los elementos importantes estén presentes en el componente
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByText('He olvidado mi contraseña')).toBeTruthy();
    expect(getByText('iniciar sesión')).toBeTruthy();
    expect(getByText('¿Necesitas una cuenta?')).toBeTruthy();
    expect(getByText('Registrar')).toBeTruthy();
  });

  it('updates state on input change', () => {
    const { getByPlaceholderText } = render(<Login />);

    const usuarioInput = getByPlaceholderText('Correo electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');

    fireEvent.changeText(usuarioInput, 'usuario123');
    fireEvent.changeText(passwordInput, 'contraseña456');

    // Verifica que el estado se actualice correctamente
    expect(usuarioInput.props.value).toBe('usuario123');
    expect(passwordInput.props.value).toBe('contraseña456');
  });

  it('navigates to RecuperarContrasena screen', () => {
    // Mock de la función navigate
    const navigateMock = jest.fn();

    // Renderizar el componente Login con la función de navegación mockeada
    const { getByText } = render(<Login navigation={{ navigate: navigateMock }} />);

    // Simular el clic en el enlace 'He olvidado mi contraseña'
    fireEvent.press(getByText('contraseña'));

    // Verificar si la función de navegación fue llamada con los argumentos correctos
    expect(navigateMock).toHaveBeenCalledWith('Recuperar Contrasena', { name: 'Recuperar Contrasena' });
  });

  it('navigates to Register screen', () => {
    // Mock de la función navigate
    const navigateMock = jest.fn();

    // Renderizar el componente Login con la función de navegación mockeada
    const { getByText } = render(<Login navigation={{ navigate: navigateMock }} />);

    // Simular el clic en el enlace 'Registrar'
    fireEvent.press(getByText('Registrar'));

    // Verificar si la función de navegación fue llamada con los argumentos correctos
    expect(navigateMock).toHaveBeenCalledWith('Registrar', { name: 'Registrar' });
  });
});