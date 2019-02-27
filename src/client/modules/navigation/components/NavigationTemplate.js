import React from 'react';
import PropTypes from 'prop-types';

import { TertiaryHeadline } from '../../../components/Headline';
import { Button, MiniButton } from '../../../components/Button';
import { NavList, NavListItem } from './NavList';
import { NavLink } from './NavLink';

export function NavigationTemplate({
  actions: { newPage },
  pages,
}) {
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
                  {' '}
                  <MiniButton>
                    <strong>-</strong>
                  </MiniButton>
                </NavListItem>
              ))}
            </NavList>
          )}
          <Button onClick={newPage}>
            <strong>+</strong> New page
          </Button>
        </NavListItem>
      </NavList>
    </nav>
  );
}

NavigationTemplate.propTypes = {
  actions: PropTypes.shape({
    newPage: PropTypes.func.isRequired,
  }).isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};
