import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryHeadline, SecondaryHeadline } from '../../../components/Headline';
import { FormRow } from '../../../components/FormRow';
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

      <SecondaryHeadline>Slug (a-z 0-9)</SecondaryHeadline>
      <input
        onChange={onChangeHandler('slug')}
        value={slug}
        placeholder="Allowed characters: a-z 0-9"
        pattern="[\w\d]+"
        required
      />

      <SecondaryHeadline>Title</SecondaryHeadline>
      <input
        onChange={onChangeHandler('title')}
        value={title}
        required
      />

      <SecondaryHeadline>Text</SecondaryHeadline>
      <textarea
        onChange={onChangeHandler('text')}
        value={text}
        required
      />
      
      <hr />
      
      <FormRow>
        <Button type="submit">Save</Button>
        <Button type="reset">Reset</Button> 
      </FormRow>
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
