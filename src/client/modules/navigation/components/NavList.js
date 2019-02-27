/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export function NavList(props) {
  return (
    <ul {...{
      ...props,
      css: css`
        margin: 0 0 .5em;
        padding: 0;
        list-style: none;
      `,
    }} />
  );
}

export function NavListItem(props) {
  return (
    <ul {...{
      ...props,
      css: css`
        margin: 0;
        padding: .2em 0;
      `,
    }}
    />
  );
}
