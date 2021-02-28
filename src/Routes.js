import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { InfoPage } from "./pages/InfoPage";
import { MunicipalityDetailPage } from "./pages/MunicipalityDetailPage";

export const route = {
  home: () => `/`,
  municipality: () => `/obec/:code`,
  info: () => `/info`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route
        path={route.municipality()}
        exact
        component={MunicipalityDetailPage}
      />
      <Route path={route.info()} exact component={InfoPage} />
      <Route path="*">
        <Redirect to={route.home()} />
      </Route>
    </Switch>
  );
}
