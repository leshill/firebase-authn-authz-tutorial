import React, { useEffect, useState } from "react";

import { useFirebaseContext } from "FirebaseApp";

const Home: React.FC = () => {
  const firebase = useFirebaseContext();

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const user = firebase.auth.currentUser;

    if (user) {
      user.getIdTokenResult().then((idToken) => {
        setAdmin(idToken.claims.admin);
      });
    }
  }, [firebase.auth.currentUser]);

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
      <p>
        User is { admin ? "" : "not"} an admin
      </p>
    </div>
  );
};

export default Home;
