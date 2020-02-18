import React, { useState } from "react";

const initialState = {
  email: "",
  password: ""
};

const SignIn: React.FC = () => {
  const [creds, setCreds] = useState(initialState);

  const { email, password } = creds;

  const isInvalid = password === "" ||
                    email === "";

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCreds({...creds, [event.currentTarget.name]: event.currentTarget.value});
  }

  const onSubmit = (event: React.FormEvent) => {
    alert(`Sign in with email: ${email} password: ${password}`);
    event.preventDefault();
  };

  return (
    <div>
      <h1>Sign In</h1>
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
