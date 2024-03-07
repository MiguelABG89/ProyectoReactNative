import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EnglishHomeScreen  from "../Ventanas/englishScreens/englishHomeScreen";
import { signOut } from 'aws-amplify/auth';
import { get } from 'aws-amplify/api';

// Mockear solo las funciones necesarias
jest.mock('aws-amplify/auth', () => ({
  signOut: jest.fn(),
}));

jest.mock('aws-amplify/api', () => ({
  get: jest.fn(),
}));

describe('EnglishHomeScreen Component', () => {
  test('getTodo should be called when Call api button is pressed', async () => {
    const { getByText } = render(<EnglishHomeScreen />);
    
    // Simula el clic en el botón de llamada a la API
    fireEvent.press(getByText('Call api'));

    // Asegúrate de que getTodo haya sido llamado con los argumentos correctos
    expect(get).toHaveBeenCalledWith({
      apiName: 'ProyectoReactNative',
      path: '/items',
      options: {
        queryParams: {
          id: '1234',
        },
      },
    });
  });

  test('handleSignOut should be called when Log out button is pressed', async () => {
    const { getByText } = render(<EnglishHomeScreen />);
    
    // Simula el clic en el botón de cierre de sesión
    fireEvent.press(getByText('Log out'));

    // Asegúrate de que handleSignOut haya sido llamado
    expect(signOut).toHaveBeenCalled();
  });

});
