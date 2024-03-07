import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EnglishPassword from "../Ventanas/englishScreens/englishPassword";
import { resetPassword } from 'aws-amplify/auth';

// Mockear solo las funciones necesarias
jest.mock('aws-amplify/auth', () => ({
  resetPassword: jest.fn(),
}));

describe("EnglishPassword Component", () => {
  test("handleResetPassword should be called when Recover password button is pressed with a valid input", async () => {
    const { getByText, getByPlaceholderText } = render(<EnglishPassword />);

    // Simula la entrada de usuario
    fireEvent.changeText(getByPlaceholderText("User"), "testUser");

    // Simula el clic en el botón de recuperar contraseña
    fireEvent.press(getByText("Recover password"));

    // Asegúrate de que resetPassword haya sido llamado con los argumentos correctos
    expect(resetPassword).toHaveBeenCalledWith({ username: "testUser" });
  });

});
