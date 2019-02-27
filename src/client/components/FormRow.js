/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export function FormRow(props) {
  return (
    <div {...{
      ...props,
      css: css`
        display: flex;

        & > * + button,
        & > * + input {
          margin-left: .5em;
        }
      `,
    }} />
  );
}
