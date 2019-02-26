import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export function PageTemplate({
  actions: {
    updatePage,
    revertPage,
    changeFieldValue,
  },
  page: {
    title,
    body,
  },
}) {
  const onChangeHandler = fieldName => evt =>
    changeFieldValue(fieldName, evt.target.value);

  return (
    <Fragment>
      <h1>{title}</h1>

      <input value={title} onChange={onChangeHandler('title')} />
      <textarea value={body} onChange={onChangeHandler('body')} />
      
      <button onClick={updatePage}>Save</button>
      <button onClick={revertPage}>Reset</button>
    </Fragment>
  );
}

PageTemplate.propTypes = {
  actions: PropTypes.shape({
    updatePage: PropTypes.func.isRequired,
    revertPage: PropTypes.func.isRequired,
    changeFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
};
