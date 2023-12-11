import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as client from './client';
import { Link } from "react-router-dom";

function Signup(props) {
  const isAuthenticated = props.setAuthentication;

  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'LISTENER'
  });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const currentUser = await client.signup(credentials);
      isAuthenticated(true);
      localStorage.setItem('authentication', true);
      navigate('/Profile');
    } catch (error) {
      setError(error);
    }
  };


  return (
    <div>
      <h1>Sign Up</h1>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <input
        type="text"
        className="form-control w-25"
        placeholder='username'
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        className="form-control w-25"
        placeholder='password'
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />

      Role: 
      <select
        className="form-control w-25"
        value={credentials.role}
        onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
      >
        <option value="LISTENER">Listener</option>
        <option value="ARTIST">Artist</option>
      </select>



      <button onClick={signup} className="btn btn-primary" style={{ marginRight: '10px' }}>
        Sign Up
      </button>
      <Link to="/signin" className="btn btn-primary">
        Sign In
      </Link>
    </div>
  );
}

export default Signup;
