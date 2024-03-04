import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../Ventanas/spanishScreens/spanishHomeScreen';

describe('HomeScreen component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Verifica que algunos elementos estén presentes en el componente
    expect(getByText('Llamar api')).toBeTruthy();
    expect(getByText('Cerrar sesión')).toBeTruthy();
  });

  test('calls API when "Llamar api" button is pressed', async () => {
    const { getByText } = render(<HomeScreen />);
    
    // Simula el clic en el botón de llamar API
    fireEvent.press(getByText('Llamar api'));

    // Puedes agregar aserciones aquí para verificar que la llamada a la API fue exitosa.
    // Por ejemplo, verificar que se imprimió el mensaje correcto en la consola.

    // Aquí, estamos esperando 500 ms (puedes ajustar esto según sea necesario)
    await waitFor(() => {}, { timeout: 500 });
  });

  test('signs out when "Cerrar sesión" button is pressed', async () => {
    const { getByText } = render(<HomeScreen />);
    
    // Simula el clic en el botón de cerrar sesión
    fireEvent.press(getByText('Cerrar sesión'));

    // Puedes agregar aserciones aquí para verificar que se ha cerrado la sesión.
    // Por ejemplo, puedes verificar que se navega a la pantalla de inicio.

    // Aquí, estamos esperando 500 ms (puedes ajustar esto según sea necesario)
    await waitFor(() => {}, { timeout: 500 });
  });

  // Agrega más pruebas según sea necesario para cubrir otros casos y condiciones.
});
