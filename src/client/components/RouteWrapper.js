import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../modules/navigation/Navigation';

export function wrapRouteComponent(Component) {
  function RouteWrapper({ match: { url, params } }) {
    return (
      <Fragment>
        <Navigation key={url} />
        <hr />
        <Component params={params} />
      </Fragment>
    );
  }
  
  RouteWrapper.propTypes = {
    match: PropTypes.shape().isRequired,
    Body: PropTypes.func.isRequired,
  };

  return RouteWrapper;
}
