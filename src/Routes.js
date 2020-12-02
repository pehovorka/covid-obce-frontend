import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { HomePage } from "./pages/HomePage";

export const route = {
  home: () => `/`,
  obec: () => `/obec/:obec_kod`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.obec()} exact component={HomePage} />
      <Route path="*">
        <Redirect to={route.home()} />
      </Route>
    </Switch>
  );
}
