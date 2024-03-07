import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EnglishNewPassword from "../Ventanas/englishScreens/englishNewPassword";
import { confirmResetPassword } from "@aws-amplify/auth";

// Mockear solo las funciones necesarias
jest.mock('@aws-amplify/auth', () => ({
  confirmResetPassword: jest.fn(),
}));

describe("EnglishNewPassword Component", () => {
  test("handleConfirmResetPassword should be called when Recover password button is pressed with valid inputs", async () => {
    const { getByText, getByPlaceholderText } = render(<EnglishNewPassword />);

    // Simula la entrada de código y contraseñas
    fireEvent.changeText(getByPlaceholderText("Code"), "123456");
    fireEvent.changeText(getByPlaceholderText("New Password"), "newPassword");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "newPassword");

    // Simula el clic en el botón de recuperar contraseña
    fireEvent.press(getByText("Recover password"));

    // Asegúrate de que confirmResetPassword haya sido llamado con los argumentos correctos
    expect(confirmResetPassword).toHaveBeenCalledWith({
      username: 'mockedUsername',  // Debes ajustar esto según tus necesidades
      confirmationCode: '123456',
      newPassword: 'newPassword',
    });
  });
});
