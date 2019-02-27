import React, { Fragment } from 'react';
import { Router, Redirect, Route } from "react-router-dom";
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './store';
import { wrapRouteComponent } from './components/RouteWrapper';
import { GlobalStyles } from './components/GlobalStyles';

import Settings from './modules/settings/Settings';
import Page from './modules/page/Page';

export function App() {
  return (
    <Fragment>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Router history={history}>
          <Switch>
            <Redirect exact from="/" to="/settings" />
            <Route path="/settings" render={wrapRouteComponent(Settings)} />
            <Route path="/pages/:pageId" render={wrapRouteComponent(Page)} />
            <Route render={wrapRouteComponent(() => <div>No Match</div>)} />
          </Switch>
        </Router>
      </ConnectedRouter>
    </Fragment>
  );
}
