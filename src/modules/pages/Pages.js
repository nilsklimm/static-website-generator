import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";

import { fetchPages } from './pagesDuck';

class Pages extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      fetchPages: PropTypes.func.isRequired,
    }),
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
      actions: { fetchPages },
      pages,
    } = this.props;
    
    if (pages.length === 0)
      fetchPages();
  }

  render() {
    const { pages } = this.props;
    return !!pages && pages.length > 0 && (
      <ul>
        {pages.map(({ id, title }) => (
          <li key={id}>
            <NavLink to={`/pages/${id}`}>{title}</NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(
  state => ({
    pages: state.pages.pages,
  }),
  dispatch => ({
    actions: {
      fetchPages: pageId => dispatch(fetchPages(pageId)),
    },
  }),
)(Pages);
