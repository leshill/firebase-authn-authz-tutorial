import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => (
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
    </ul>
  </div>
);

export default Navigation;
