import React from "react";

import { useFirebaseContext } from "FirebaseApp";

const Home: React.FC = () => {
  const firebase = useFirebaseContext();

  return (
    <div>
      <h1>Home</h1>
      <p>
        The app config is {JSON.stringify(firebase.config())}.
      </p>
      <p>
        {
          firebase.auth.currentUser ?
          firebase.auth.currentUser.email : "Not signed in"
        }
      </p>
    </div>
  );
};

export default Home;
