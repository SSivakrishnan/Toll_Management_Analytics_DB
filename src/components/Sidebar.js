import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar">
      <div className="sidebar_element">
        <Link to="/"> Vehicle </Link>
      </div>
      <div className="sidebar_element">
        <Link to="/all-tolls"> Toll</Link>
      </div>
      <div className="sidebar_element">
        <Link to="/analyze"> Analyze</Link>
      </div>
    </nav>
  );
}

export default Sidebar;
