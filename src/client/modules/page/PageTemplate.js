import React from 'react';
import PropTypes from 'prop-types';

export function PageTemplate({ title }) {
  return <div>{title}</div>;
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
}
