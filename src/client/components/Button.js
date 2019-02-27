/** @jsx jsx */
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';

export function Button(props) {
  return (
    <button {...{
      ...props,
      css: css`
        margin: 0 .5em .5em 0;
        padding: .5em 1em;
      `,
    }} />
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  type: 'button',
};
