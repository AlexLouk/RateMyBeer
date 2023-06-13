import React, { Component, useContext, useEffect, useState } from 'react';
import './User.css'
import '../App.css'
import { Button } from 'react-bootstrap';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';


const User = () => {
  const { loginInfo, setLoginInfo, defaultLoginInfo } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (loginInfo.token == null) navigate('/login')
  }, [loginInfo])
  
    
  function LogOut () {
    const destroyLogin = () => {
      localStorage.removeItem('rmb_user_data')
      setLoginInfo(defaultLoginInfo)
    }
    
    return (
      <div className="logout-form">
        <p>Signed in as {loginInfo.user_name}</p>
        <Button onClick={destroyLogin} variant='outline-danger'>Log Out</Button>
      </div>
    )
  }

  function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handlePasswordChange = async (event) => {
      event.preventDefault();
      setLoading("Changing Password...")

      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords don't match.");
        setLoading(false)
        return;
      }

      if (newPassword == currentPassword) {
        setErrorMessage("New password can't be same as old password.");
      }

      const response = await fetch('http://localhost:3001/update/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginInfo.token}`
        },
        body: JSON.stringify({
          current: currentPassword,
          new: newPassword
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setErrorMessage("")
        alert("Your password was updated.")
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error)
        console.error('Error:', errorData);
      }

      // Hier kommt die Logik zum Ändern des Passworts hin.
      // Zum Beispiel kann man hier eine API-Anfrage senden.

      // Zurücksetzen der Eingabefelder
      setLoading(false)
    };

    return (
      <form className="change-password-form" onSubmit={handlePasswordChange}>
        <h2>Change password</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <label>
          Current password:
          <input required type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </label>
        <label>
          New password:
          <input required type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <label>
          Confirm password:
          <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <div className='button-container'>
          <button className='change-password-button' disabled={loading}>{loading || "Change password"}</button>
        </div>
      </form>
    );
  }

  function DeleteAccount() {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const handleDeleteAccount = async (event) => {
      event.preventDefault();

      if (!window.confirm("Are you sure you want to delete this account?")) return
      
      setErrorMessage("");
      setLoading("Deleting account...")
      

      const response = await fetch(`http://localhost:3001/user/deleteUser/${loginInfo.user_name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
			    'Authorization': `Bearer ${loginInfo.token}`,
        },
        body: JSON.stringify({
          user_password: password
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setPassword("");
        alert("Your account has been deleted.")
        setLoginInfo(defaultLoginInfo)
        localStorage.removeItem("rmb_user_data")
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error)
        console.error('Error:', errorData);
      }
      setLoading(false)
    };


    return (
      <form onSubmit={handleDeleteAccount} className="delete-account-form">
        <h2>Delete Account</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='change-name-button' disabled={loading}>{loading || "Delete Account"}</button>
      </form>
    );
  }

  function ChangeName() {
    const [newName, setNewName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const handleChangeName = async (event) => {
      event.preventDefault()
      setNewName("");
      setErrorMessage("");
      setLoading("Updating name...")
      

      const response = await fetch('http://localhost:3001/update/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
			    'Authorization': `Bearer ${loginInfo.token}`,
        },
        body: JSON.stringify({
          user_name: newName
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        alert("Your name was updated.")
        setLoginInfo({...loginInfo, user_name: newName})
        localStorage.setItem("rmb_user_data", JSON.stringify({...JSON.parse(localStorage.getItem("rmb_user_data")), user_name: newName}))
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error)
        console.error('Error:', errorData);
      }
    };

    return (
      <form onSubmit={handleChangeName} className="change-name-form">
        <h2>Change name</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <label>
          New name:
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </label>
        <button className='change-name-button' disabled={loading}>{loading || "Change name"}</button>
      </form>
    );
  }

  return (
    <>
      <div className='wrapper'>
        <LogOut />
        <ChangePassword />
        <ChangeName />
        <DeleteAccount />

      </div>
    </>
  );
}

export default User;
