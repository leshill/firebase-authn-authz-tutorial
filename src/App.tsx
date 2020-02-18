import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Navigation from "Navigation";
import Home from "Home";
import Landing from "Landing";

function App() {
  return (
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
  );
}

export default App;