import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">
        <h3>Logo</h3>
      </Link>
      <ul className="nav-links">
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/shop">
          <li>Shop</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
