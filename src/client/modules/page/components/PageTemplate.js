import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryHeadline, SecondaryHeadline } from '../../../components/Headline';
import { Button } from '../../../components/Button';

export function PageTemplate({
  actions: {
    updatePage,
    revertPage,
    changeFieldValue,
  },
  page: {
    slug,
    title,
    text,
  },
}) {
  const onChangeHandler = fieldName => evt =>
    changeFieldValue(fieldName, evt.target.value);

    const onSubmitHandler = (evt) => {
      evt.preventDefault();
      updatePage();
    };
  
    const onResetHandler = (evt) => {
      evt.preventDefault();
      revertPage();
    };

  return (
    <form
      onSubmit={onSubmitHandler}
      onReset={onResetHandler}
    >
      <PrimaryHeadline>{title}</PrimaryHeadline>

      <SecondaryHeadline>Slug</SecondaryHeadline>
      <input
        value={slug}
        onChange={onChangeHandler('slug')}
      />

      <SecondaryHeadline>Title</SecondaryHeadline>
      <input
        value={title}
        onChange={onChangeHandler('title')}
      />

      <SecondaryHeadline>Text</SecondaryHeadline>
      <textarea
        value={text}
        onChange={onChangeHandler('text')}
      />
      
      <hr />

      <Button type="submit">Save</Button>
      <Button type="reset">Reset</Button>
    </form>
  );
}

PageTemplate.propTypes = {
  actions: PropTypes.shape({
    updatePage: PropTypes.func.isRequired,
    revertPage: PropTypes.func.isRequired,
    changeFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  page: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};
