import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EnglishLogin from "../Ventanas/englishScreens/englishLogin";

jest.mock("aws-amplify/auth", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("EnglishLogin Component", () => {
  test("handleSingIn should be called when Log in button is pressed", async () => {
    const { getByText, getByPlaceholderText } = render(<EnglishLogin />);

    // Simula la entrada de usuario y contraseña
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");

    // Simula el clic en el botón de inicio de sesión
    fireEvent.press(getByText("Log in"));

    // Asegúrate de que handleSingIn haya sido llamado
    expect(signIn).toHaveBeenCalledWith({
      username: "test@example.com",
      password: "password",
      options: { authFlowType: "USER_PASSWORD_AUTH" },
    });
  });
});
