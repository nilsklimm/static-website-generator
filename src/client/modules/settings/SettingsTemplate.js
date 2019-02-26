import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// import { Button } from '../../components/Button';

export function SettingsTemplate({
  actions: {
    updateSettings,
    revertSettings,
    changeFieldValue,
  },
  settings,
}) {
  const settingsKeys = Object.keys(settings);

  const onChangeHandler = fieldName => evt =>
    changeFieldValue(fieldName, evt.target.value);

  return (
    <Fragment>
      <h1>Settings</h1>
      {settingsKeys.length > 0 && (
        <dl>
          {settingsKeys.map(settingsKey => (
            <Fragment key={settingsKey}>
              <dt>{settingsKey}</dt>
              <dd>
                <input
                  value={settings[settingsKey]}
                  onChange={onChangeHandler(settingsKey)} />
              </dd>
            </Fragment>
          ))}
        </dl>
      )}

      <button onClick={updateSettings}>Save</button>
      <button onClick={revertSettings}>Reset</button>
    </Fragment>
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
