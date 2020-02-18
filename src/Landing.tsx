import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => (
  <div>
    <h1>Landing</h1>
    <Link to="/sign-up">
      Sign Up
    </Link>
  </div>
);

export default Landing;
