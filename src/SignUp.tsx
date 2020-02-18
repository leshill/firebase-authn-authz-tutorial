import React, { useState } from "react";

const initialState = {
  email: "",
  passwordOne: "",
  passwordTwo: ""
};

const SignUp: React.FC = () => {
  const [creds, setCreds] = useState(initialState);

  const { email, passwordOne, passwordTwo } = creds;

  const isInvalid = passwordOne !== passwordTwo ||
                    passwordOne === "" ||
                    email === "";

  const onChange = (event: React.FormEvent<HTMLInputElement>) =>
    setCreds({...creds, [event.currentTarget.name]: event.currentTarget.value});

  const onSubmit = (event: React.FormEvent) => {
    alert(`Email: ${email} Password: ${passwordOne}`);
    setCreds(initialState);
    event.preventDefault();
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
