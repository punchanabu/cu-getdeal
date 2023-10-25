import React, { useState } from 'react';
import { verifyUser } from '../../api/UserApi';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
          email,
          password
    };
    try {
      const response = await verifyUser(data);
      if (!response.ok) {
        console.log('error', 'Invalid email or password');
      }
      // set Jwt to local storage
      const jwt = await response.json();
      localStorage.setItem('jwt', jwt);
      navigate('/content');
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}