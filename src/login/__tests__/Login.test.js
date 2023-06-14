import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../../AppContext";
import Login from "../Login";

describe("Login", () => {
  it("submits the login form", () => {
    const mockLoginInfo = {};

    render(
      <MemoryRouter>
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <Login />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Log in");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Überprüfe, ob die Werte korrekt im State aktualisiert wurden
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("displays an error message on login failure", async () => {
    const mockLoginInfo = {};

    render(
      <MemoryRouter>
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <Login />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const submitButton = screen.getByText("Log in");
    fireEvent.click(submitButton);

    // Warte auf das Auftreten des Fehlermeldungselements
    await waitFor(() => {
      const errorMessage = screen.getByText("Network request failed");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('navigates to user page when login is successful', async () => {
    const mockSetLoginInfo = jest.fn();
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <AppContext.Provider value={{ loginInfo: {}, setLoginInfo: mockSetLoginInfo }}>
          <Login />
        </AppContext.Provider>
      </MemoryRouter>
    );
  });

  it("keeps the input fields filled after a successful login", async () => {
    const mockSetLoginInfo = jest.fn();
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ loginInfo: {}, setLoginInfo: mockSetLoginInfo }}>
          <Login />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Log in");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Überprüfe, ob die Werte korrekt im State aktualisiert wurden
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("navigates to the register page when 'Create an account' link is clicked", () => {
    const setLoginInfo = jest.fn();

    render(
      <MemoryRouter>
        <AppContext.Provider value={{ loginInfo: {}, setLoginInfo }}>
          <Login />
        </AppContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Don't have an account yet?"));

    expect(screen.getByText((content, element) => {
      // Überprüfen, ob der Text "Don't have an account yet?" im Link enthalten ist
      const hasText = element.textContent === "Don't have an account yet?";
      // Überprüfen, ob der Link zum Pfad "/register" führt
      const hasHref = element.getAttribute("href") === "/register";
      return hasText && hasHref;
    })).toBeInTheDocument();
  });

  it("updates the email and password input values", () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ loginInfo: {}, setLoginInfo: jest.fn() }}>
          <Login />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it('renders login form with email and password inputs', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ loginInfo: {}, setLoginInfo: jest.fn() }}>
          <Login />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });


});