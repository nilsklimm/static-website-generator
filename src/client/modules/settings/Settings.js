import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSettings, selectSettings } from './settingsDuck';
import { SettingsTemplate } from './SettingsTemplate';

class Settings extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      fetchSettings: PropTypes.func.isRequired,
    }).isRequired,
    settings: PropTypes.shape({
      siteName: PropTypes.string,
    }),
  }

  static defaultProps = {
    settings: {},
  }

  componentDidMount() {
    const { actions: { fetchSettings } } = this.props;
    fetchSettings();
  }

  render() {
    const { settings } = this.props;
    return !!settings && <SettingsTemplate {...{ settings } } />;
  }
}

export default connect(
  state => ({
    settings: selectSettings(state),
  }),
  dispatch => ({
    actions: {
      fetchSettings: () => dispatch(fetchSettings()),
    },
  }),
)(Settings);
