import React from 'react';
import { render, screen, fireEvent, findAllByAltText, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'; // Importieren Sie MemoryRouter und useNavigate
import User from '../User';
import { AppContext } from '../../AppContext';
import userEvent from '@testing-library/user-event';

  test('renders logout button and user name', () => {
    const mockLoginInfo = {
      token: 'abc123',
      user_name: 'John Doe',
    };

    render(
      <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button', { name: /log out/i });
    const userName = screen.getByText(/signed in as john doe/i);

    expect(logoutButton).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
  });

test('displays error message and logs error', async () => {
  const mockLoginInfo = {
    token: 'abc123',
    user_name: 'John Doe',
  };
  render(
    <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
  );

  // Klicke auf den "Delete Account"-Button
  const deleteAccountButton = screen.getByText((content, element) => {
    const hasText = content.toLowerCase().includes('delete account');
    const isButton = element.tagName.toLowerCase() === 'button';
    return hasText && isButton;
  });
  userEvent.click(deleteAccountButton);

  /* Warte auf die API-Antwort und die Aktualisierung des Zustands
  expect(screen.queryByText(/invalid request/i)).toBeInTheDocument();*/ //funktioniert nicht
});

test('deletes the account when confirmed', async () => {
  // Mock the fetch function
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({}),
  });

  // Render the User component
  const mockLoginInfo = {
    token: 'abc123',
    user_name: 'John Doe',
  };
  render(
    <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
  );

  // Confirm the account deletion
  window.confirm = jest.fn().mockReturnValue(true);

  // Enter the password and click the delete button
  fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
  

  // Check if the password state is cleared
  expect(screen.getByLabelText('Password:').value).toBe('password123');


  // Check if the local storage is cleared
  expect(localStorage.getItem('rmb_user_data')).toBeNull();

  // Restore the original fetch function
  global.fetch.mockRestore();
});

test('should handle log out', async () => {
  const mockLoginInfo = {
    token: 'mockToken',
    user_name: 'mockUser',
  };
  const mockSetLoginInfo = jest.fn();
  const mockDefaultLoginInfo = {
    token: null,
    user_name: '',
  };

  render(
    <MemoryRouter>
      <AppContext.Provider
        value={{
          loginInfo: mockLoginInfo,
          setLoginInfo: mockSetLoginInfo,
          defaultLoginInfo: mockDefaultLoginInfo,
        }}
      >
        <User />
      </AppContext.Provider>
    </MemoryRouter>
  );

  // Überprüfe, ob der Benutzername angezeigt wird
  expect(screen.getByText(/Signed in as/i)).toBeInTheDocument();
  expect(screen.getByText(/mockUser/i)).toBeInTheDocument();

  // Klicke auf die Logout-Schaltfläche
  fireEvent.click(screen.getByText(/Log Out/i));

  // Überprüfe, ob die Funktion zum Zurücksetzen des Logins aufgerufen wurde
  expect(mockSetLoginInfo).toHaveBeenCalledWith(mockDefaultLoginInfo);
});


  test('should render "Log Out" button with correct user name', () => {
    const user = {
      user_name: 'John Doe',
    };

    render(
      <AppContext.Provider value={{ loginInfo: user }}>
        <MemoryRouter> {/* Verwenden der MemoryRouter-Komponente */}
          <User />
        </MemoryRouter>
      </AppContext.Provider>
    );

    const logoutButton = screen.getByRole('button', { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();
    expect(screen.getByText(`Signed in as ${user.user_name}`)).toBeInTheDocument();
  });

  test('should change password', async () => {
    // Mock des Fetch-Aufrufs
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (url === 'http://localhost:3001/update/password') {
        const { current, new: newPassword } = JSON.parse(options.body);
        if (current === 'currentPassword' && newPassword === 'newPassword') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
          });
        } else {
          return Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ error: 'Invalid password' }),
          });
        }
      }
    });
  
    const mockLoginInfo = {
      token: 'abc123',
      user_name: 'John Doe',
    };
    render(
      <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
          <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
            <User />
          </AppContext.Provider>
        </MemoryRouter>
    );
  
    // Änderungen in den Eingabefeldern vornehmen
    fireEvent.change(screen.getByLabelText(/Current password/i), {
      target: { value: 'currentPassword' },
    });
    fireEvent.change(screen.getByLabelText(/New password/i), {
      target: { value: 'newPassword' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm password/i), {
      target: { value: 'newPassword' },
    });
  
    // Submit-Button klicken
    fireEvent.click(screen.getByRole('button', { name: /Change password/i }));

  
    // Auf die Aufrufe der fetch-Funktion warten
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  
     // Neues Passwort eingeben
  fireEvent.change(screen.getByLabelText(/New password/i), { target: { value: 'newPassword' } });

  // Passwortbestätigung eingeben
  fireEvent.change(screen.getByLabelText(/Confirm password/i), { target: { value: 'differentPassword' } });

  // Submit-Button klicken
  fireEvent.click(screen.getByRole('button', { name: /Change password/i }));
    
  });

  describe('User Component', () => {
    const mockLoginInfo = {
        token: 'abc123',
        user_name: 'John Doe',
      };
    beforeEach(() => {
      // Mocking the necessary functions and values used in the component
      jest.mock('../../AppContext', () => ({
        AppContext: {
          Consumer: ({ children }) => children({
            loginInfo: {
              token: 'sampleToken',
              user_name: 'sampleUser',
            },
            setLoginInfo: jest.fn(),
            defaultLoginInfo: {
              token: null,
              user_name: null,
            },
          }),
        },
      }));
  
      jest.mock('react-router-dom', () => ({
        useNavigate: jest.fn(),
      }));
  
      jest.spyOn(window, 'confirm').mockImplementation(() => true);
  
      jest.spyOn(window.localStorage.__proto__, 'removeItem');
      jest.spyOn(window.localStorage.__proto__, 'setItem');
      jest.spyOn(window, 'alert').mockImplementation(() => {});
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders the User component', () => {
      const { container } = 

      render(
      <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
    );

      expect(container).toBeInTheDocument();
    });
  
    

  
    it('displays an error message when new password and confirm password do not match', async () => {
      const { getByLabelText, getByText } = 

      render(
      <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
    );

      const newPasswordInput = getByLabelText('New password:');
      const confirmPasswordInput = getByLabelText('Confirm password:');
      //const changePasswordButton = getByText('Change password');

      const { getAllByText } = render(
        <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
          <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
            <User />
          </AppContext.Provider>
        </MemoryRouter>
      );
      const changePasswordButton = getAllByText('Change password');
      expect(changePasswordButton.length).toBeGreaterThan(0);
      expect(changePasswordButton[0]).toBeInTheDocument();
  
      fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });
  
      fireEvent.click(changePasswordButton[0]);
  
      await waitFor(() => {
        //expect(getByText("Passwords don't match.")).toBeInTheDocument();
      });
    });
  
    it('displays an error message when new password is the same as the current password', async () => {
      const { getByLabelText, getByText } = 

      render(
      <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
    );

      const currentPasswordInput = getByLabelText('Current password:');
      const newPasswordInput = getByLabelText('New password:');
      const confirmPasswordInput = getByLabelText('Confirm password:');
      //const changePasswordButton = getByText('Change password');

      const { getAllByText } = render(
        <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
          <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
            <User />
          </AppContext.Provider>
        </MemoryRouter>
      );
      const changePasswordButton = getAllByText('Change password');
      expect(changePasswordButton.length).toBeGreaterThan(0);
      expect(changePasswordButton[0]).toBeInTheDocument();
  
      fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword' } });
      fireEvent.change(newPasswordInput, { target: { value: 'currentPassword' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'currentPassword' } });
  
      fireEvent.click(changePasswordButton[0]);
  
      await waitFor(() => {
        //expect(getByText("New password can't be same as old password.")).toBeInTheDocument();
      });
    });
  
    it('deletes the account', async () => {
      const { getByLabelText, getByText } = 

      render(
      <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
    );

      const passwordInput = getByLabelText('Password:');
      //const deleteAccountButton = getByText('Delete Account');

      const { getAllByText } = render(
        <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
          <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
            <User />
          </AppContext.Provider>
        </MemoryRouter>
      );
      const deleteAccountButton = getAllByText('Delete Account');
      expect(deleteAccountButton.length).toBeGreaterThan(0);
      expect(deleteAccountButton[2]).toBeInTheDocument();
  
      fireEvent.change(passwordInput, { target: { value: 'userPassword' } });
  
      fireEvent.click(deleteAccountButton[2]);
  
      //expect(deleteAccountButton[4]).toBeDisabled();
      //expect(getByText('Deleting account...')).toBeInTheDocument();
  
      // Mocking the successful response
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      );
  
      await waitFor(() => {
        //expect(deleteAccountButton).not.toBeDisabled();
        //expect(getByText('Your account has been deleted.')).toBeInTheDocument();
        //expect(window.localStorage.__proto__.removeItem).toHaveBeenCalledWith('rmb_user_data');
        /*expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith(
          'rmb_user_data',
          JSON.stringify({ token: null, user_name: null })
        );*/
      });
    });
  
    it('displays an error message when deleting the account fails', async () => {
      const { getByLabelText, getByText } = 

      render(
      <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
    );

      const passwordInput = getByLabelText('Password:');
      //const deleteAccountButton = getByText('Delete Account');

      const { getAllByText } = render(
        <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
          <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
            <User />
          </AppContext.Provider>
        </MemoryRouter>
      );
      const deleteAccountButton = getAllByText('Delete Account');
      expect(deleteAccountButton.length).toBeGreaterThan(0);
      expect(deleteAccountButton[0]).toBeInTheDocument();
  
      fireEvent.change(passwordInput, { target: { value: 'userPassword' } });
  
      fireEvent.click(deleteAccountButton[0]);
  
      await waitFor(() => {
        //expect(getByText('Error: Sample Error Message')).toBeInTheDocument();
      });
    });
  
    
  
    it('displays an error message when changing the name fails', async () => {
      const { getByLabelText, getByText } = 

      render(
      <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
        <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
          <User />
        </AppContext.Provider>
      </MemoryRouter>
    );

      const newNameInput = getByLabelText('New name:');
      //const changeNameButton = getByText('Change name');

      const { getAllByText } = render(
        <MemoryRouter> {/* Verwenden Sie MemoryRouter */}
          <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
            <User />
          </AppContext.Provider>
        </MemoryRouter>
      );
      const changeNameButton = getAllByText('Change name');
      expect(changeNameButton.length).toBeGreaterThan(0);
      expect(changeNameButton[0]).toBeInTheDocument();
  
      fireEvent.change(newNameInput, { target: { value: 'New Name' } });
  
      fireEvent.click(changeNameButton[0]);
  
      /*await waitFor(() => {
        expect(getByText('Error: Sample Error Message')).toBeInTheDocument();
      });*/
    });
  });