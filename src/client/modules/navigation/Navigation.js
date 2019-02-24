import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchNavigationPages, selectNavigationPages } from './navigationDuck';
import { NavigationTemplate } from './NavigationTemplate';

class Pages extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      fetchPages: PropTypes.func.isRequired,
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
      actions: { fetchNavigationPages },
      pages,
    } = this.props;
    
    if (pages.length === 0)
      fetchNavigationPages();
  }

  render() {
    const { pages } = this.props;
    return <NavigationTemplate {...{ pages }} />;
  }
}

export default connect(
  state => ({
    pages: selectNavigationPages(state),
  }),
  dispatch => ({
    actions: {
      fetchNavigationPages: pageId => dispatch(fetchNavigationPages(pageId)),
    },
  }),
)(Pages);
