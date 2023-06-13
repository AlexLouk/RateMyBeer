import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

describe("Register", () => {
  
  it("should display error message if registration fails", async () => {
    const errorMessage = "Failed to register";

    // Mock the fetch function to simulate a failed registration
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

    const errorText = await waitFor(() =>
      screen.getByText(errorMessage)
    );
    expect(errorText).toBeInTheDocument();

    // Restore the original fetch function
    global.fetch.mockRestore();
  });
  
});
