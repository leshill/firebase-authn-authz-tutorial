import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useFirebaseContext } from "FirebaseApp";

const TrackAuth: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const firebase = useFirebaseContext();

  useEffect(() => {
    const cancelListener = firebase.trackAuthStateChanged(dispatch);

    return () => {
      cancelListener();
    }
  }, [dispatch, firebase]);

  return (
    <React.Fragment>
      { children }
    </React.Fragment>
  );
};

export default TrackAuth;
