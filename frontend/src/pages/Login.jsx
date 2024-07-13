import React from 'react'
import { useState } from 'react';
import "../styles/Login.css"

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const response = await fetch('http://localhost:4001/api/v1/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();
    if(response.ok) {
     
      localStorage.setItem("token", data.token)
      console.log("received token after login:", data.token);
      setMessage(data.message || "Login successful!")
    }
    else {
      setMessage(`Login failed: ${data.error}`);
    }
  }
  return (
    <>
      <div className='login-container'>
        <form className='login-form' onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          {message && <div className='message'>{message}</div>}
        </form>
      </div>
    </>
  );
  }

