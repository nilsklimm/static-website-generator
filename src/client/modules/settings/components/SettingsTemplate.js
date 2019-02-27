import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash.map';
import startCase from 'lodash.startcase';

import { PrimaryHeadline, SecondaryHeadline } from '../../../components/Headline';
import { FormRow } from '../../../components/FormRow';
import { Button } from '../../../components/Button';

export function SettingsTemplate({
  actions: {
    updateSettings,
    revertSettings,
    changeFieldValue,
  },
  settings,
}) {
  const onChangeHandler = fieldName => evt =>
    changeFieldValue(fieldName, evt.target.value);

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    updateSettings();
  };

  const onResetHandler = (evt) => {
    evt.preventDefault();
    revertSettings();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      onReset={onResetHandler}
    >
      <PrimaryHeadline>Settings</PrimaryHeadline>

      {map(settings, (value, key) => (
        <Fragment key={key}>
          <SecondaryHeadline>{startCase(key)}</SecondaryHeadline>
          <input
            onChange={onChangeHandler(key)}
            value={value}
            required
          />
        </Fragment>
      ))}

      <hr />

      <FormRow>
        <Button type="submit">Save</Button>
        <Button type="reset">Reset</Button> 
      </FormRow>
    </form>
  );
}

SettingsTemplate.propTypes = {
  actions: PropTypes.shape({
    updateSettings: PropTypes.func.isRequired,
    revertSettings: PropTypes.func.isRequired,
    changeFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  settings: PropTypes.shape({
    siteName: PropTypes.string,
  }).isRequired,
};
