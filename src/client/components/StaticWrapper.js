import React from 'react';
import PropTypes from 'prop-types';

import { LinkList } from './LinkList';

export function StaticWrapper({
  siteName,
  pageTitle,
  linkList,
  children,
}) {
  return (
    <html>
      <head>
        <title>{`${siteName} - ${pageTitle}`}</title>
      </head>
      <body>
        <LinkList list={linkList} />
        {children}
      </body>
    </html>
  );
}

StaticWrapper.propTypes = {
  siteName: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  linkList: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  children: PropTypes.node.isRequired,
}
