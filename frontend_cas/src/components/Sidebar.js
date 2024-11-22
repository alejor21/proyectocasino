import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Sidebar = () => (
  <nav className="sidebar">
    <ul>
      <li>
        <NavLink to="/usuarios" activeClassName="active">Usuarios</NavLink>
      </li>
      <li>
        <NavLink to="/apuestas" activeClassName="active">Apuestas</NavLink>
      </li>
    </ul>
  </nav>
);

export default Sidebar;