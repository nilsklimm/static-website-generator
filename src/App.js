import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from 'react-router';

import Nav from './modules/nav/Nav';
import Settings from './modules/settings/Settings';
import Page from './modules/page/Page';


function wrapComponent(Body) {
  function Wrapper({ match: { url, params } }) {
    return (
      <Fragment>
        <Nav key={url} />
        <Body params={params} />
      </Fragment>
    )
  }

  Wrapper.propTypes = {
    match: PropTypes.shape().isRequired,
    Body: PropTypes.func.isRequired,
  }

  return Wrapper;
}

const App = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={wrapComponent(() => <div>Home</div>)}/>
        <Route path="/settings" render={wrapComponent(Settings)} />
        <Route path="/pages/:pageId" render={wrapComponent(Page)} />
        <Route render={wrapComponent(() => <div>No Match</div>)} />
      </Switch>
    </BrowserRouter>
  </Fragment>
);

export default App;
