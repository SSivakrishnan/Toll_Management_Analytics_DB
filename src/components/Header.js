import React from "react";

function Header() {
  return (
    <header>
      <h1>Toll Management Application</h1>
      <button
        className="toggle_button"
        onClick={() => {
          document.getElementById("sidebar").classList.toggle("sidebar_active");
        }}
      >
        <i class="fa fa-bars nav_fa_bars"></i>
      </button>
    </header>
  );
}

export default Header;
