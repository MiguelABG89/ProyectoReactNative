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
});