import React from 'react';
import PropTypes from 'prop-types';

export function Link({
  children,
  href,
  current,
}) {
  return (
    <a {...{
      href,
      'aria-current': current ? 'page' : null,
    }}>
      {children}
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  current: PropTypes.bool,
};

Link.defaultProps = {
  children: undefined,
  current: false,
};
