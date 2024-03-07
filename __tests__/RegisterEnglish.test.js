import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import EnglishRegister from "../Ventanas/englishScreens/englishRegister";
import { signUp } from 'aws-amplify/auth';

// Mockear solo las funciones necesarias
jest.mock('aws-amplify/auth', () => ({
  signUp: jest.fn(),
}));

describe("EnglishRegister Component", () => {
  test("handleSignUp should be called when Sign up button is pressed with valid inputs", async () => {
    const { getByText, getByPlaceholderText } = render(<EnglishRegister />);

    // Simula la entrada de usuario, correo y contraseñas
    fireEvent.changeText(getByPlaceholderText("User"), "testUser");
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "password");

    // Simula el clic en el botón de registrarse
    fireEvent.press(getByText("Sign up"));

    // Asegúrate de que signUp haya sido llamado con los argumentos correctos
    await waitFor(() => expect(signUp).toHaveBeenCalledWith({
      username: "testUser",
      password: "password",
      options: {
        userAttributes: {
          email: "test@example.com"
        },
      }
    }));
  });
});
