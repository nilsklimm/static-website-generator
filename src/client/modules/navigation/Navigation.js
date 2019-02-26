import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectNavigationPages, readNavigationPages } from './navigationDuck';
import { NavigationTemplate } from './NavigationTemplate';

class Pages extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      readPages: PropTypes.func.isRequired,
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
      actions: { readNavigationPages },
      pages,
    } = this.props;
    
    if (pages.length === 0)
      readNavigationPages();
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
      readNavigationPages: pageId => dispatch(readNavigationPages(pageId)),
    },
  }),
)(Pages);
