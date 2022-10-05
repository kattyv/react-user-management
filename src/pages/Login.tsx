import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useReduxTyped';
import { updateAuth } from '../features/Auth';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/img/logo.svg'
import { loading } from '../features/Preloader';

export const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { checkUser } = useAuth();
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    checkUser(username, password).then(
      (result) => {
        dispatch(loading(true));

        setTimeout(() => {
          dispatch(updateAuth({
            status: 'logged',
            user: result
          }));
          navigate('/users');
          dispatch(loading(false));
        }, 500)
      },
      (error) => {
        setLoginError(error);
      }
    );
  }

  //TODO: Adding Enter key support

  return (
    <div className="pg-login | flex-centered">
        <div className="form">

          <header className='pg-title'>
            <img src={ logo } alt="" className='logo' />
            <h1>Login</h1>
          </header>
          

          <p className='text-error'>{ loginError }</p>

          <input 
            type="text" 
            placeholder='Username...' 
            className={loginError ? 'error' : ''}
            onChange={ e => {setUsername(e.target.value)}}
          />

          <input 
            type="password" 
            placeholder='Password...' 
            className={loginError ? 'error' : ''}
            onChange={e => setPassword(e.target.value)}
          />
          
          <button className='btn btn-primary' onClick={ () => {
            handleLogin(username, password);
          }}>
            Login
          </button>

          <small>
            Sample login credentials: <br />
            Username: <b>Admin</b>
            {" / "}
            Password: <b>1234</b>
          </small>
        </div>
    </div>
  )
}
