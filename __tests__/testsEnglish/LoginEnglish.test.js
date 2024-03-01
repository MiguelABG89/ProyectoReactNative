import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EnglishLogin from './EnglishLogin';

describe('EnglishLogin Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<EnglishLogin />);

    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('I forgot my password')).toBeTruthy();
    expect(getByText('Log in')).toBeTruthy();
    expect(getByText('Log out')).toBeTruthy();
    expect(getByText('Do you need an account?')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  it('updates state on input change', () => {
    const { getByPlaceholderText } = render(<EnglishLogin />);
    const usuarioInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(usuarioInput, 'user123');
    fireEvent.changeText(passwordInput, 'password456');

    expect(usuarioInput.props.value).toBe('user123');
    expect(passwordInput.props.value).toBe('password456');
  });

  it('navigates to Recover password screen', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<EnglishLogin navigation={{ navigate: navigateMock }} />);
    fireEvent.press(getByText('password'));

    expect(navigateMock).toHaveBeenCalledWith('Recover password', { name: 'Recover Password' });
  });

  it('navigates to Register screen', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<EnglishLogin navigation={{ navigate: navigateMock }} />);
    fireEvent.press(getByText('Register'));

    expect(navigateMock).toHaveBeenCalledWith('Register', { name: 'Register' });
  });
});
