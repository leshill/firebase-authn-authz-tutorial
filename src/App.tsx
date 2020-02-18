import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Navigation from "Navigation";
import Home from "Home";
import Landing from "Landing";
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
              <Redirect from="/*" to="/landing"/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </FirebaseContextProvider>
  );
}

export default App;
