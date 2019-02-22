import React from 'react';
import { Link } from "react-router-dom";

import Pages from '../pages/Pages';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
      <li>
        <span>Pages:</span>
        <Pages />
      </li>
    </ul>
  </nav>
)

export default Nav;
