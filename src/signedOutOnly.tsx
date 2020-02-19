import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "rootReducer";

const signedOutOnly: <P extends object>(Wrapped: React.ComponentType<P>) =>
  React.FC<P> =
    (Wrapped) => {
      // <eye-roll>
      // TypeScript linter error with direct return:
      // React Hook "useSelector" cannot be called inside a callback. React Hooks
      // must be called in a React function component or a custom React Hook function
      // react-hooks/rules-of-hooks
      //
      // TypeScript linter error without Capitalized name:
      // React Hook "useSelector" is called in function "wrapper" which is neither a
      // React function component or a custom React Hook function
      // </eye-roll>
      const Wrapper = (props: any) => {
        const currentUser = useSelector((state: RootState) => state.auth.currentUser);

        if (currentUser) {
          return (
            <Redirect to="/home"/>
          );
        } else {
          return (
            <Wrapped {...props} />
          );
        }
      };
      return Wrapper;
    };

export default signedOutOnly;
