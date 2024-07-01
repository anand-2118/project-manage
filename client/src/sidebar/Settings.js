import React, { useState, useContext } from 'react';
//import { AuthContext } from '../../context/AuthContext';

const Settings = () => {
  //const { user, updateUser, logout } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    //await updateUser({ name, email, oldPassword, newPassword });
   // logout();
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Update name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Update email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;
