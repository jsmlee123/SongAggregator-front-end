import * as client from './client';
import { useState } from 'react';
import { isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function Signin(props) {
  // credentials has username, password
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const isAuthenticated = props.setAuthentication;

  // navigates to the account page after signin
  const signin = async () => {
    try {
      await client.signin(credentials);
      isAuthenticated(true);
      localStorage.setItem('authentication', true);
      navigate('/Home');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>Signin</h1>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <input
        placeholder='username'
        type="text"
        className="form-control w-25"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        placeholder='password'
        type="password"
        className="form-control w-25"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <button onClick={signin} className="btn btn-primary" style={{ marginRight: '10px' }}>
        Sign In
      </button>

      <Link to="/signup" className="btn btn-primary">
        Sign Up
      </Link>

  
    </div>
  );
}
export default Signin;
