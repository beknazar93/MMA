import React from "react";
import photo from './img/arap.jpg'
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container">
      <div className="admin">
        <h1 className="admin__title">Admin panel</h1>

        <div className="admin__block">
          <Link to='/Signup' className="admin__block-link"><img src={photo} className="admin__block-link-img"/></Link>
          <Link to='/Signup' className="admin__block-link"><img src={photo} className="admin__block-link-img"/></Link>
        </div>

      </div>
    </div>
  );
};

export default Admin;
