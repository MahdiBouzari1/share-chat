import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleButtonClick(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password
      });

      if (response.data.status === "exist") {
        navigate("/main", { state: { username: response.data.username } });
      } else if (response.data.status === "notexist") {
        alert("User has not signed up");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Wrong details");
      console.error(error);
    }
  }

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form action="POST">
        <div className="inputs">
          <div className="input">
            <AlternateEmailIcon className='icon' />
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <KeyIcon className='icon' />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="submit" onClick={handleButtonClick}>
          Login
        </button>
      </form>
      <div className="switch-action">
        *Don't have an account yet?{" "}
        <span className="link" onClick={() => navigate('/Signup')}>
          Sign Up
        </span>
      </div>
    </div>
  );
}

export default Login;
