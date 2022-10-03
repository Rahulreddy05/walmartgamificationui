import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
   <>
   <header>
      <h1 className="apptitle">Book Gamification App</h1>
      <hr/>
      <div className="links">
        <NavLink to="/" className="link" activeClassName="active" exact>
          Books List
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          Add Book Details
        </NavLink>
      </div>
      <hr />
    </header>
    </>
  );
};

export default Header;