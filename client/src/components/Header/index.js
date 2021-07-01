import React from 'react';
import {Link} from 'react-router-dom';

import auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    auth.logout();
  }

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to='/'>
        <h1>Deep Thoughts</h1>
        </Link>

        <nav className='text-center'>
          {auth.loggedIn() ? (
            <>
            <Link to='/profile'>My Profile</Link>
            <a href='/'
            onClick={logout}>
              Log Out</a>
            </>
          ) : (
            <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
