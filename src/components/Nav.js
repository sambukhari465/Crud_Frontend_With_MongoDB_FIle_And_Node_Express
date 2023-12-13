import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='showtable'>
      <ul>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/">Signin</Link>
        </li>
        <li>
          <Link to="/loginform">LoginForm</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li> 
         <li>
          <Link to="/table">Table</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
