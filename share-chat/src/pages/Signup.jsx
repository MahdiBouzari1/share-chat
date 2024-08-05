import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  async function handleButtonClick(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        username,
        email,
        password
      });

      if (response.data.status === "exist") {
        alert("User already exists");
      } else if (response.data.status === "notexist") {
        navigate("/main", { state: { username: response.data.username } });
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Wrong details");
      console.error(error);
    }
  }

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <PersonIcon className='icon' />
          <input
            type="text"
            placeholder='User name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        Sign Up
      </button>
      <div className="switch-action">
        *Already have an account?{" "}
        <span className="link" onClick={() => navigate('/')}>
          Login
        </span>
      </div>
    </div>
  );
}

export default Signup;
