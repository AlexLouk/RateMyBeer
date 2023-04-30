import React, { Component, useState } from 'react';
import SubmitButton from './SubmitButton';
import './Styles.css'
import '../App.css'
import logo from '../logos/Logo2.png'

class User extends Component {
  render() {
    return (
      <>
        <div className='wrapper'>
          <ChangePassword />
          <ChangeName />
          <DeleteAccount />

        </div>
      </>
    );
  }
}

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Neues Passwort und Bestätigung stimmen nicht überein.");
      return;
    }

    // Hier kommt die Logik zum Ändern des Passworts hin.
    // Zum Beispiel kann man hier eine API-Anfrage senden.

    // Zurücksetzen der Eingabefelder
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };

  return (
    <div className="change-password-form">
      <h2>Change password</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <label>
        Current password:
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      </label>
      <label>
        New password:
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <label>
        Confirm password:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <div className='button-container'>
        <button className='change-password-button' onClick={handlePasswordChange}>Change password</button>
      </div>
    </div>
  );
}

function DeleteAccount() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteAccount = () => {
    // Hier kommt die Logik zum Löschen des Accounts hin.
    // Zum Beispiel kann man hier eine API-Anfrage senden.

    // Zurücksetzen der Eingabefelder
    setPassword("");
    setErrorMessage("");
  };

  return (
    <div className="delete-account-form">
      <h2>Delete Account</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className='change-name-button' onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

function ChangeName() {
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeName = () => {
    // Hier kommt die Logik zum Ändern des Namens hin.
    // Zum Beispiel kann man hier eine API-Anfrage senden.

    // Zurücksetzen der Eingabefelder
    setNewName("");
    setErrorMessage("");
  };

  return (
    <div className="change-name-form">
      <h2>Change name</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <label>
        New name:
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
      </label>
      <button className='change-name-button' onClick={handleChangeName}>Change name</button>
    </div>
  );
}

export default User;
