import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "store";
import Navigation from "Navigation";
import Home from "Home";
import Landing from "Landing";
import SignIn from "SignIn";
import SignUp from "SignUp";
import FirebaseApp, { FirebaseContextProvider } from "FirebaseApp";

const firebase = new FirebaseApp();

function App() {
  return (
    <Provider store={store}>
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
                <Route exact path="/sign-in" component={SignIn}/>
                <Route exact path="/sign-up" component={SignUp}/>
                <Redirect from="/*" to="/landing"/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </FirebaseContextProvider>
    </Provider>
  );
}

export default App;
