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
    <div className='d-flex flex-column align-items-center justify-content-center login-container'>
      <div className='d-flex flex-column align-items-center justify-content-center login-card rounded-5'>
        {error && <div className="alert alert-danger">{error.message}</div>}
        <h1>Sign Up</h1>
        <input
          type="text"
          className="form-control w-75"
          placeholder='username'
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          type="password"
          className="form-control w-75 mt-2"
          placeholder='password'
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      
        <h5>Role: </h5>
        <select
          className="form-control w-75"
          value={credentials.role}
          onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
        >
          <option value="LISTENER">Listener</option>
          <option value="ARTIST">Artist</option>
        </select>

        <div className='d-flex flex-row mt-3'>
          <button onClick={signup} className="btn btn-secondary btn-lg me-4">
            Sign Up
          </button>
          <Link to="/signin" className="btn btn-secondary btn-lg">
            Sign In
          </Link>
        </div>
      </div>
    </div>
    
  );
}

export default Signup;
