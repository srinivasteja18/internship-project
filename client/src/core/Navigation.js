import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="header">
      <div className="nav-helper">
        <h1>XYZ Hospital</h1>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/appointments">
              My Appointments
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navigation;
