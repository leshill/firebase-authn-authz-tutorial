import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store";
import Admin from "Admin";
import Navigation from "Navigation";
import Home from "Home";
import Landing from "Landing";
import SignIn from "SignIn";
import SignUp from "SignUp";
import TrackAuth from "TrackAuth";
import FirebaseApp, { FirebaseContextProvider } from "FirebaseApp";

const firebase = new FirebaseApp();

function App() {
  return (
    <Provider store={store}>
      <FirebaseContextProvider value={firebase}>
        <TrackAuth>
          <BrowserRouter>
            <div>
              <header>
                <Navigation/>
              </header>
              <div>
                <Switch>
                  <Route exact path="/home" component={Home}/>
                  <Route exact path="/landing" component={Landing}/>
                  <Route exact path="/sign-in" component={SignIn}/>
                  <Route exact path="/sign-up" component={SignUp}/>
                  <Route exact path="/admin" component={Admin}/>
                  <Redirect from="/*" to="/landing"/>
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </TrackAuth>
      </FirebaseContextProvider>
    </Provider>
  );
}

export default App;
