import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectPage,
  readPage,
  updatePage,
  revertPage,
  changeTempFieldValue,
} from './pageDuck';

import { PageTemplate } from './components/PageTemplate';

class Page extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      readPage: PropTypes.func.isRequired,
      updatePage: PropTypes.func.isRequired,
      changeFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      pageId: PropTypes.string.isRequired,
    }).isRequired,
    page: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  }
  
  static defaultProps = {
    page: undefined,
  }

  componentDidMount() {
    const {
      params: { pageId },
      actions: { readPage },
    } = this.props;
    
    readPage(pageId);
  }

  componentDidUpdate(prevProps) {
    const {
      params: { pageId: prevPageId },
    } = prevProps;

    const {
      actions: { readPage },
      params: { pageId },
    } = this.props;

    if (pageId !== prevPageId) {
      readPage(pageId);
    }
  }

  render() {
    const {
      actions: { updatePage, revertPage, changeFieldValue },
      page,
    } = this.props;

    return !!page && (
      <PageTemplate {...{
        actions: {
          updatePage,
          revertPage,
          changeFieldValue,
        },
        page,
      } }
      />
    );
  }
}

export default connect(
  state => ({
    page: selectPage(state),
  }),
  dispatch => ({
    actions: {
      readPage: pageId => dispatch(readPage(pageId)),
      updatePage: () => dispatch(updatePage()),
      revertPage: () => dispatch(revertPage()),
      changeFieldValue: (fieldName, value) => dispatch(changeTempFieldValue(fieldName, value)),
    },
  }),
)(Page);
