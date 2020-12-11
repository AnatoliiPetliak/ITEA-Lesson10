import React from "react";
import "./navBar.css";

const NavBar = (props) => {
  return (
    <div className="navbar">
      <a href="!#">Home</a>
      <a href="https://www.notion.so/1-e89e61d80e24442f8e2230d26db54e93">
        Task
      </a>

      <a href="!#">{props.children}</a>
    </div>
  );
};

export default NavBar;
