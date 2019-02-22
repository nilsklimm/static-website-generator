import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSettings } from './settingsDuck';

class Settings extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      fetchSettings: PropTypes.func.isRequired,
    }),
    settings: PropTypes.shape(),
  }

  static defaultProps = {
    settings: undefined,
  }

  componentDidMount() {
    const { actions: { fetchSettings } } = this.props;
    fetchSettings();
  }

  render() {
    return <div>Settings</div>;
  }
}

export default connect(
  state => ({
    settings: state.settings.settings,
  }),
  dispatch => ({
    actions: {
      fetchSettings: () => dispatch(fetchSettings()),
    },
  }),
)(Settings);
