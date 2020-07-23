import React from "react";
import { isAuthenticated } from "./auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <PrivateRoute path="/" exact component={Home} />
      {/* <Route path="/shop" exact component={Shop} /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
