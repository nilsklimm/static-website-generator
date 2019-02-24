import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

export function NavigationTemplate({ pages }) {
  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
          <li>
            <span>Pages:</span>
            {!!pages && pages.length > 0 && (
              <ul>
                {pages.map(({ id, title }) => (
                  <li key={id}>
                    <NavLink to={`/page/${id}`}>{title}</NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}

NavigationTemplate.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  ).isRequired,
};
