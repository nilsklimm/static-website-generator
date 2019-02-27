import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { selectPages, readPages } from './navigationDuck';
import { NavigationTemplate } from './components/NavigationTemplate';

class Navigation extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      readPages: PropTypes.func.isRequired,
      newPage: PropTypes.func.isRequired,
    }).isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
  }
  
  static defaultProps = {
    pages: [],
  }

  componentDidMount() {
    const {
      actions: { readPages },
      pages,
    } = this.props;
    
    if (pages.length === 0)
    readPages();
  }

  render() {
    const { actions, pages } = this.props;
    return <NavigationTemplate {...{ actions, pages }} />;
  }
}

export default connect(
  state => ({
    pages: selectPages(state),
  }),
  dispatch => ({
    actions: {
      readPages: () => dispatch(readPages()),
      newPage: () => dispatch(push('/pages/new')),
    },
  }),
)(Navigation);
