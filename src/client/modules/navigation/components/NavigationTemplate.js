import React from 'react';
import PropTypes from 'prop-types';

import { TertiaryHeadline } from '../../../components/Headline';
import { NavList, NavListItem } from './NavList';
import { NavLink } from './NavLink';

export function NavigationTemplate({ pages }) {
  return (
    <nav>
      <NavList>
        <NavListItem>
          <NavLink to="/settings">Settings</NavLink>
        </NavListItem>
        <NavListItem>
          <TertiaryHeadline tagName="label">Pages:</TertiaryHeadline>
          {pages.length > 0 && (
            <NavList>
              {pages.map(({ id, title }) => (
                <NavListItem key={id}>
                  <NavLink to={`/pages/${id}`}>{title}</NavLink>
                </NavListItem>
              ))}
            </NavList>
          )}
          {/*<Button>Add new page</Button>*/}
        </NavListItem>
      </NavList>
    </nav>
  );
}

NavigationTemplate.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  ).isRequired,
};
