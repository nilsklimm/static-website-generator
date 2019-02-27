import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectSettings,
  readSettings,
  updateSettings,
  revertTempSettings,
  changeTempFieldValue,
} from './settingsDuck';

import { SettingsTemplate } from './components/SettingsTemplate';

class Settings extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      readSettings: PropTypes.func.isRequired,
      updateSettings: PropTypes.func.isRequired,
      revertSettings: PropTypes.func.isRequired,
      changeFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    settings: PropTypes.shape({
      siteName: PropTypes.string,
    }),
  }

  static defaultProps = {
    settings: {},
  }

  componentDidMount() {
    const { actions: { readSettings } } = this.props;
    readSettings();
  }

  render() {
    const { actions, settings } = this.props;
    return !!settings && <SettingsTemplate {...{ actions, settings }} />;
  }
}

export default connect(
  state => ({
    settings: selectSettings(state),
  }),
  dispatch => ({
    actions: {
      readSettings: () => dispatch(readSettings()),
      updateSettings: () => dispatch(updateSettings()),
      revertSettings: () => dispatch(revertTempSettings()),
      changeFieldValue: (fieldName, value) => dispatch(changeTempFieldValue(fieldName, value)),
    },
  }),
)(Settings);
