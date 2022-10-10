import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import appLogo from '../../assets/img/logo.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxTyped'
import { resetAuth } from '../../features/Auth'

export const Header = () => {
  const authState = useAppSelector(state => state.auth.value);
  const { status, user } = authState;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout resetAuth
    setTimeout(() => {
      dispatch(resetAuth());
      navigate("/");
    }, 2000)
  }

  return (
    <header className="pg-header">
      <div className="container">
        <Link to="/users" className="logo">
          <img src={ appLogo } alt="" />
          UManager
        </Link>

        {status === 'logged' &&
        <nav className="main-nav">
            <ul>
              <li><NavLink to="/users">Users</NavLink></li>
              <li><NavLink to="/users/new">Add user</NavLink></li>
            </ul>
        </nav>
        }

        <div className="log-user | inline-group">
          {user &&
            <> 
              Hello, {user?.name} {user?.surname}
              <button onClick={ handleLogout } className="btn btn-icon">
                <i className="icon icon-exit"></i>
              </button>
            </>
          }
          {(!user || status !== 'logged') &&
            <Link to="/login">Login</Link>
          }
        </div>
      </div>
    </header>
  )
}
