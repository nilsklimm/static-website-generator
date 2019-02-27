/** @jsx jsx */
import { NavLink as ReactRouterNavLink } from "react-router-dom";
import styled from '@emotion/styled';

export const NavLink = styled(ReactRouterNavLink)`
  text-decoration: none;
  color: blue;
  &.active::before {
    content: '> ';
  }
`;
