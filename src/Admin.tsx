import React, { useEffect, useState } from "react";

import { useFirebaseContext } from "FirebaseApp";

const Admin: React.FC = () => {
  const firebase = useFirebaseContext();

  const [state, setState] = useState({
    error: null as string | null,
    users: [] as any[]
  });
  const {error, users} = state;

  useEffect(() => {
    firebase.listUsers().then((result: firebase.functions.HttpsCallableResult) => {
      setState({
        error: null,
        users: result.data
      });
    }).catch((error: {message: string}) => {
      setState({
        error: error.message,
        users: []
      });
    });
  }, [firebase]);

  return (
    <div>
      <h1>Admin: Users list</h1>
      { error && <p>{error}</p> }
      <ul>
        {
          users.map(
            user => (
              <li key={user.uid}>
                <ul>
                  <li>
                    Email: {user.email}
                  </li>
                  <li>
                    Admin: {user.customClaims.admin ? "true" : "false"}
                  </li>
                </ul>
              </li>
            )
          )
        }
      </ul>
    </div>
  );
};

export default Admin;
