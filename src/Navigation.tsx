import React from "react";
import { Link } from "react-router-dom";

import { useFirebaseContext } from "FirebaseApp";

const Navigation: React.FC = () => {
  const firebase = useFirebaseContext();

  const onSignOutClicked = (event: React.MouseEvent) => {
    firebase.signOut();
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
