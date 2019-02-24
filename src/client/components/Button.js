import React from 'react';
import PropTypes from 'prop-types';

export function Button({
  children,
  type,
}) {
  return (
    <button {...{ type }}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  children: undefined,
  type: 'button',
};
