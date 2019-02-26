import React from 'react';
import PropTypes from 'prop-types';

import { LinkList } from './LinkList';

export function StaticPage({
  siteName,
  linkList,
  page: {
    title,
    body,
  },
}) {
  return (
    <html>
      <head>
        <title>{`${siteName} - ${title}`}</title>
      </head>
      <body>
        <LinkList list={linkList} />
        <h1>{title}</h1>
        <p>{body}</p>
      </body>
    </html>
  );
}

StaticPage.propTypes = {
  siteName: PropTypes.string.isRequired,
  linkList: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
};
