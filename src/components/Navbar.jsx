import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
           <Link to="/" className="navbar-brand">
             Velocompra   
           </Link>
           <div className="navbar-links">
              <Link to="/usuarios" className="navbar-link">
                Usuários
              </Link>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
           </div>    
        </nav>
    );
};

export default Navbar;