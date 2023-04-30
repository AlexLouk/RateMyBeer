import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {Login} from '../Login';

describe('Login', () => {
    it("has a login button", async () => {
        // Setup
        render(<Login />);

        // Act
        const login = await screen.getByText(/Log In/i);

        // Result
        expect(login).toBeInTheDocument();
    })

    it("handles click on register button", async () => {
        // Setup
        render(<Login />);

        // Act
        const registerText = await screen.getByText("Don't have an account? Register here!");
        userEvent.click(registerText)

        // Result
        expect(registerText).toBeInTheDocument();
    })
});

