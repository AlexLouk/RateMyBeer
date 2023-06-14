import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Register from "../Register";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe("Register", () => {

  it("should display error message if registration fails", async () => {
    const errorMessage = "Failed to register";

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
      })
    );

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);

    const errorText = await waitFor(() => screen.getByText(errorMessage));
    expect(errorText).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  it("should navigate to login page after successful registration", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);

    await waitFor(() =>
      expect(navigateMock).toHaveBeenCalledWith("/login")
    );

    global.fetch.mockRestore();
    useNavigate.mockRestore();
  });

  it("should display error message if registration encounters an error", async () => {
    const errorMessage = "Error occurred during registration";

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.reject(new Error(errorMessage))
    );

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const errorText = screen.queryByText(errorMessage);
      expect(errorText).toBeNull();
    });

    global.fetch.mockRestore();
  });

  it("should trigger onClick event and console.log when 'Already have an account?' link is clicked", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  
    const loginLink = screen.getByText("Already have an account?");
    fireEvent.click(loginLink);
  
    expect(consoleLogSpy).toHaveBeenCalledWith("Already have an account?");
    consoleLogSpy.mockRestore();
  });

});



describe("Register Input Functions", () => {
  it("should update the 'name' state when the username input changes", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Username");
    fireEvent.change(nameInput, { target: { value: "JohnDoe" } });

    expect(nameInput.value).toBe("JohnDoe");
  });

  it("should update the 'email' state when the email input changes", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("beermail@gmail.com");
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });

    expect(emailInput.value).toBe("john.doe@example.com");
  });

  it("should update the 'pass' state when the password input changes", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "secretpassword" } });

    expect(passwordInput.value).toBe("secretpassword");
  });
});