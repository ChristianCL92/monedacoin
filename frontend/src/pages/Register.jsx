import React from 'react'
import { useState } from 'react';
import "../styles/Register.css"

export const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4001/api/v1/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    const data = await response.json();
    if(response.ok) {
      setMessage(data.message || "Register successful")
    }
    else {
      setMessage(`Register failed: ${data.message}`);
    }
  };

  return (
    <>
      <div className='register-container'>
        <form className='register-form' onSubmit={handleSubmit}>
          <div>
            <label> Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          {message && <div className='message'>{message}</div>}
        </form>
      </div>
    </>
  );
}

