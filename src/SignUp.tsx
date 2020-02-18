import React, { useState } from "react";

import { useFirebaseContext } from "FirebaseApp";

const initialState = {
  email: "",
  error: null as string | null,
  passwordOne: "",
  passwordTwo: ""
};

const SignUp: React.FC = () => {
  const firebase = useFirebaseContext();

  const [creds, setCreds] = useState(initialState);

  const { email, error, passwordOne, passwordTwo } = creds;

  const isInvalid = passwordOne !== passwordTwo ||
                    passwordOne === "" ||
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
    firebase.createUser(email, passwordOne)
            .then(_authUser => {
              setCreds({ ...initialState });
            })
            .catch(error => {
              setCreds({ ...creds, error: error.message });
            });
    event.preventDefault();
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
          name="passwordOne"
          value={passwordOne}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
