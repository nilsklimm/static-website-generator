import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPage } from './pageDuck';

class Page extends Component {
  static propTypes = {
    params: PropTypes.shape({
      pageId: PropTypes.string.isRequired,
    }),
    actions: PropTypes.shape({
      fetchPage: PropTypes.func.isRequired,
    }),
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
    return !!page && <div>{page.title}</div>;
  }
}

export default connect(
  state => ({
    page: state.page.page,
  }),
  dispatch => ({
    actions: {
      fetchPage: pageId => dispatch(fetchPage(pageId)),
    },
  }),
)(Page);
