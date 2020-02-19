import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

import { RootState } from "rootReducer";
import { useFirebaseContext } from "FirebaseApp";

const Authenticated: React.FC = () => {
  const firebase = useFirebaseContext();

  const onSignOutClicked = (event: React.MouseEvent) => {
    firebase.signOut();
    event.preventDefault();
  };

  return (
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
  );
}

const Unauthenticated: React.FC = () => (
  <ul>
    <li>
      <Link to="/landing">
        Landing
      </Link>
    </li>
    <li>
      <Link to="/sign-in">
        Sign In
      </Link>
    </li>
    <li>
      <Link to="/sign-up">
        Sign Up
      </Link>
    </li>
  </ul>
);

const Navigation: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  if (currentUser) {
    return (
      <div>
        <Authenticated/>
      </div>
    );
  } else {
    return (
      <div>
        <Unauthenticated/>
      </div>
    );
  }
};

export default Navigation;
