import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPage, selectPage } from './pageDuck';
import { PageTemplate } from './PageTemplate';

class Page extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      fetchPage: PropTypes.func.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      pageId: PropTypes.string.isRequired,
    }).isRequired,
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  }
  
  static defaultProps = {
    page: undefined,
  }

  componentDidMount() {
    const {
      params: { pageId },
      actions: { fetchPage },
    } = this.props;
    
    fetchPage(pageId);
  }

  componentDidUpdate(prevProps) {
    const {
      params: { pageId: prevPageId },
    } = prevProps;

    const {
      params: { pageId },
      actions: { fetchPage },
    } = this.props;

    if (pageId !== prevPageId)
      fetchPage(pageId);
  }

  render() {
    const { page } = this.props;
    return !!page && <PageTemplate {...page} />;
  }
}

export default connect(
  state => ({
    page: selectPage(state),
  }),
  dispatch => ({
    actions: {
      fetchPage: pageId => dispatch(fetchPage(pageId)),
    },
  }),
)(Page);
