import React from 'react';
import { Global, css } from '@emotion/core';

export function GlobalStyles() {
  return (
    <Global styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html {
        font-family: Arial, Helvetica, sans-serif;
      }

      input:not([type]),
      input[type="text"],
      textarea {
        display: block;
        padding: .5em 1em;
        width: 100%;
      }

      textarea {
        min-height: 10em;
        max-height: 50em;
        resize: vertical;
      }
    `} />
  );
}
