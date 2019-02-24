import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../components/Button';

export function SettingsTemplate({ settings }) {
  const settingsKeys = Object.keys(settings);

  return (
    <Fragment>
      <h1>Settings</h1>
      {settingsKeys.length > 0 && (
        <dl>
          {settingsKeys.map(settingsKey => (
            <Fragment key={settingsKey}>
              <dt>{settingsKey}</dt>
              <dd>{settings[settingsKey]}</dd>
            </Fragment>
          ))}
        </dl>
      )}
      <Button>Save</Button>
    </Fragment>
  )
}

SettingsTemplate.propTypes = {
  settings: PropTypes.shape({
    siteName: PropTypes.string,
  }).isRequired,
}
