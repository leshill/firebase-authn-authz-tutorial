import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Navigation from "Navigation";
import Home from "Home";
import Landing from "Landing";
import SignUp from "SignUp";
import FirebaseApp, { FirebaseContextProvider } from "FirebaseApp";

const firebase = new FirebaseApp();

function App() {
  return (
    <FirebaseContextProvider value={firebase}>
      <BrowserRouter>
        <div>
          <header>
            <Navigation/>
          </header>
          <div>
            <Switch>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/landing" component={Landing}/>
              <Route exact path="/sign-up" component={SignUp}/>
              <Redirect from="/*" to="/landing"/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </FirebaseContextProvider>
  );
}

export default App;
