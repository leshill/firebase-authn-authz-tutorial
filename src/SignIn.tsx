import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useFirebaseContext } from "FirebaseApp";
import { userChanged } from "authSlice";

const initialState = {
  email: "",
  error: null as string | null,
  password: ""
};

const SignIn: React.FC = () => {
  const firebase = useFirebaseContext();
  const dispatch = useDispatch();

  const [creds, setCreds] = useState(initialState);

  const { email, error, password } = creds;

  const isInvalid = password === "" ||
                    email === "";

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCreds({
      ...creds,
      error: null,
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  const onSubmit = (event: React.FormEvent) => {
    setCreds({ ...creds, error: null });
    firebase.signIn(email, password)
            .then(_authUser => {
              setCreds({ ...initialState });
              dispatch(userChanged({name: "sign-in"}));
            })
            .catch(error => {
              setCreds({ ...creds, error: error.message });
            });
    event.preventDefault();
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p>{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
