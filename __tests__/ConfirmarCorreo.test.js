import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ConfirmarCorreo from '../Ventanas/spanishScreens/spanishConfirmarCorreo';

describe('ConfirmarCorreo component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<ConfirmarCorreo />);
    
    // Verifica que algunos elementos estén presentes en el componente
    expect(getByPlaceholderText('Usuario')).toBeTruthy();
    expect(getByPlaceholderText('Codigo')).toBeTruthy();
    expect(getByText('Confirmar')).toBeTruthy();
  });

  test('confirms sign up when "Confirmar" button is pressed', async () => {
    const { getByText, getByPlaceholderText } = render(<ConfirmarCorreo />);
    
    // Simula la entrada de datos válidos
    fireEvent.changeText(getByPlaceholderText('Usuario'), 'testUser');
    fireEvent.changeText(getByPlaceholderText('Codigo'), '123456');
    
    // Simula el clic en el botón de confirmar
    fireEvent.press(getByText('Confirmar'));

    // Puedes agregar aserciones aquí para verificar que la confirmación del registro fue exitosa.
    // Por ejemplo, puedes verificar que se navega a la pantalla de inicio.

    // Aquí, estamos esperando 500 ms (puedes ajustar esto según sea necesario)
    await waitFor(() => {}, { timeout: 500 });
  });

  // Agrega más pruebas según sea necesario para cubrir otros casos y condiciones.
});
