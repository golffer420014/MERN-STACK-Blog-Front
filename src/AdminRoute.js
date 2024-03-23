import React from "react";
import { getUser } from "./sevices/authorize";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getUser() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { form: props.location } }}
        />
      )
    }
  />
);

export default AdminRoute;
