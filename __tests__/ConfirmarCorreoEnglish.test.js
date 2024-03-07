import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EnglishConfirmMail from "../Ventanas/englishScreens/englishConfirmMail";
import { confirmSignUp } from 'aws-amplify/auth';

// Mockear solo las funciones necesarias
jest.mock('aws-amplify/auth', () => ({
  confirmSignUp: jest.fn(),
}));

describe("EnglishConfirmMail Component", () => {
  test("handleSignUpConfirmation should be called when Confirm button is pressed", async () => {
    const { getByText, getByPlaceholderText } = render(<EnglishConfirmMail />);

    // Simula la entrada de usuario y código
    fireEvent.changeText(getByPlaceholderText("User"), "testUser");
    fireEvent.changeText(getByPlaceholderText("Code"), "123456");

    // Simula el clic en el botón de confirmación
    fireEvent.press(getByText("Confirm"));

    // Asegúrate de que confirmSignUp haya sido llamado con los argumentos correctos
    expect(confirmSignUp).toHaveBeenCalledWith({
      username: "testUser",
      confirmationCode: "123456",
    });
  });

});
