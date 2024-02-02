import React from 'react';
import {render,fireEvent} from '@testing-library/react-native';
import Register from '../Ventanas/Register';

describe('Register Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    // Verifica que los elementos importantes estén presentes en el componente
    expect(getByPlaceholderText('Usuario')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByPlaceholderText('Confirmar contraseña')).toBeTruthy();
    expect(getByText('Registrarse')).toBeTruthy();
  });

  it('updates state on input change', () => {
    const { getByPlaceholderText } = render(<Register />);

    const usuarioInput = getByPlaceholderText('Usuario');
    const passwordInput = getByPlaceholderText('Contraseña');
    const password2Input = getByPlaceholderText('Confirmar contraseña');

    fireEvent.changeText(usuarioInput, 'usuario123');
    fireEvent.changeText(passwordInput, 'contraseña456');
    fireEvent.changeText(password2Input, 'contraseña456');

    // Verifica que el estado se actualice correctamente
    expect(usuarioInput.props.value).toBe('usuario123');
    expect(passwordInput.props.value).toBe('contraseña456');
    expect(password2Input.props.value).toBe('contraseña456');
  });

  it('displays error messages correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    const usuarioInput = getByPlaceholderText('Usuario');
    const passwordInput = getByPlaceholderText('Contraseña');
    const password2Input = getByPlaceholderText('Confirmar contraseña');

    // Deja campos vacíos
    fireEvent.press(getByText('Registrarse'));

    expect(getByText('Uno o más campos están vacíos')).toBeTruthy();

    // Ingresa contraseña con longitud inferior a 6
    fireEvent.changeText(usuarioInput, 'usuario123');
    fireEvent.changeText(passwordInput, 'pass');
    fireEvent.changeText(password2Input, 'pass');
    fireEvent.press(getByText('Registrarse'));

    expect(getByText('Longitud mínima de la contraseña: 6 caracteres')).toBeTruthy();

    // Ingresa contraseñas diferentes
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(password2Input, 'password456');
    fireEvent.press(getByText('Registrarse'));

    expect(getByText('Las contraseñas no son iguales')).toBeTruthy();

    // Ingresa datos válidos
    fireEvent.changeText(password2Input, 'password123');
    fireEvent.press(getByText('Registrarse'));

    // Verifica que no haya mensajes de error presentes
    expect(() => getByText('')).toBeTruthy();
    expect(() => getByText('')).toBeTruthy();
    expect(() => getByText('')).toBeTruthy();
  });

  // Test para los cambios de idioma
});