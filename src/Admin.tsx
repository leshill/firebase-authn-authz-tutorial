import React, { useEffect, useState } from "react";

import { useFirebaseContext } from "FirebaseApp";

const User: React.FC<{ user: any,
                       enabled: boolean,
                       toggle: (admin: boolean, user: any) => void }> =
  ({ user, enabled, toggle }) => {
    const toggleAdminRole = (event: React.ChangeEvent<HTMLInputElement>) => {
      toggle(event.target.checked, user);
    }

    return (
      <li>
        <ul>
          <li>
            Email: {user.email}
          </li>
          <li>
            <form>
              <label>
                Admin{}:
                <input
                  disabled={!enabled}
                  name="isAdmin"
                  type="checkbox"
                  checked={user.customClaims.admin ? true : false}
                  onChange={toggleAdminRole}
                />
              </label>
            </form>
          </li>
        </ul>
      </li>
    );
  }

const Admin: React.FC = () => {
  const firebase = useFirebaseContext();

  const [state, setState] = useState({
    enabled: true,
    error: null as string | null,
    users: [] as any[]
  });
  const {enabled, error, users} = state;

  const toggleAdmin = (admin: boolean, user: any) => {
    setState({
      ...state,
      enabled: false,
      error: null
    });
    firebase.toggleAdmin({ admin: admin, uid: user.uid }).then(() => {
      const updatedUsers = users.map((u) => {
        if (u.uid === user.uid) {
          if (admin) {
            user.customClaims.admin = true;
          } else {
            delete user.customClaims.admin;
          }
          return user;
        } else {
          return u;
        }
      });

      setState({
        ...state,
        enabled: true,
        users: updatedUsers
      });
    }).catch((error) => {
      setState({
        ...state,
        enabled: true,
        error: error.message
      });
    });
  };

  useEffect(() => {
    firebase.listUsers().then((result: firebase.functions.HttpsCallableResult) => {
      setState({
        enabled: true,
        error: null,
        users: result.data
      });
    }).catch((error: {message: string}) => {
      setState({
        enabled: true,
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
        { users.map(
            (user) =>
              (<User key={user.uid}
                     user={user}
                     enabled={enabled}
                     toggle={toggleAdmin}
              />)
        )}
      </ul>
    </div>
  );
};

export default Admin;
