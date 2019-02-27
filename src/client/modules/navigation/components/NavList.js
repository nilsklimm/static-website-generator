/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const listCss = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export function NavList(props) {
  return (
    <ul {...{
      ...props,
      css: listCss,
    }} />
  );
}

export function NavListItem(props) {
  return (
    <ul {...{
      ...props,
      css: listCss,
    }}
    />
  );
}
