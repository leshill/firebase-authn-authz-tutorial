import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const onSignOutClicked = (event: React.MouseEvent) => {
    alert("Sign out clicked");
    event.preventDefault();
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/landing">
            Landing
          </Link>
        </li>
        <li>
          <a href="#sign_out" onClick={onSignOutClicked}>
            Sign Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
