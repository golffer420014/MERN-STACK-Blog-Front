import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import FormComponent from "./FormComponent";
import SigleComponents from "./SigleComponents";
import EditComponents from "./EditComponents";
import Login from "./Login";
import AdminRoute from "../AdminRoute";

const MyRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" exact component={Login} />
        <AdminRoute path="/create" exact component={FormComponent} />
        <Route path="/blog/:slug" exact component={SigleComponents} />
        <AdminRoute path="/blog/edit/:slug" exact component={EditComponents} />
      </Switch>
    </BrowserRouter>
  );
};

export default MyRoute;
