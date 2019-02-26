import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectSettings,
  readSettings,
  updateSettings,
  revertSettings,
  changeTempFieldValue,
} from './settingsDuck';

import { SettingsTemplate } from './SettingsTemplate';

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
    const {
      actions: { updateSettings, revertSettings, changeFieldValue },
      settings,
    } = this.props;

    return !!settings && (
      <SettingsTemplate {...{
        actions: {
          updateSettings,
          revertSettings,
          changeFieldValue,
        },
        settings,
      } }
      />
    );
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
      revertSettings: () => dispatch(revertSettings()),
      changeFieldValue: (fieldName, value) => dispatch(changeTempFieldValue(fieldName, value)),
    },
  }),
)(Settings);
