
import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import "../styles/index.css"


 export const Layout = () => {
  return (
    <div className='wrapper'>
      <div className='container'>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/blockchain">Blockchain</NavLink>
              </li>
              <li>
                <NavLink to="/transaction">Transaction</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

