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
  const { isAuthenticated } = props;

  // navigates to the account page after signin
  const signin = async () => {
    try {
      await client.signin(credentials);
      localStorage.setItem('authentication', true);
      navigate('/Home');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center login-container overflow-auto'>
      <div className='d-flex flex-column align-items-center justify-content-center login-card rounded-5 overflow-auto'>
        {error && <div className="alert alert-danger">{error.message}</div>}
        <h1>Signin</h1>
        <input
          placeholder='username'
          type="text"
          className="form-control w-75 mt-2"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          placeholder='password'
          type="password"
          className="form-control w-75 mt-2"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <div className='d-flex flex-row mt-3'>
          <button onClick={signin} className="btn btn-secondary btn-lg me-4 flex-grow-1 btn-block">
            Sign In
          </button>

          <Link to="/signup" className="btn btn-secondary btn-lg btn-block">
            Sign Up
          </Link>
        </div>
        
      </div>
    </div>
  );
}
export default Signin;
