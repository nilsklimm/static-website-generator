import React, { Fragment } from 'react';
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Switch } from 'react-router';

import { wrapRouteComponent } from './components/RouteWrapper';
import { GlobalStyles } from './components/GlobalStyles';

import Settings from './modules/settings/Settings';
import Page from './modules/page/Page';

export function App() {
  return (
    <Fragment>
      <GlobalStyles />
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/settings" exact />
          <Route path="/settings" render={wrapRouteComponent(Settings)} />
          <Route path="/pages/:pageId" render={wrapRouteComponent(Page)} />
          <Route render={wrapRouteComponent(() => <div>No Match</div>)} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
