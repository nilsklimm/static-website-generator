/** @jsx jsx */
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';

export function Link({
  current,
  ...restProps
}) {
  return (
    <a {...{
      ...restProps,
      'aria-current': current ? 'page' : null,
      css: css`
        color: red;
      `,
    }} />
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  current: PropTypes.bool,
};

Link.defaultProps = {
  current: false,
};
