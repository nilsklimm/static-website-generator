import React from 'react';
import PropTypes from 'prop-types';

import { Link } from './Link';

export function LinkList({ list, LinkComponent }) {
  return list.length > 0 && (
    <ul>
      {list.map(({ url, label }) => (
        <li key={url}>
          <LinkComponent href={url}>
            {label}
          </LinkComponent>
        </li>
      ))}
    </ul>
  );
}

LinkList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  LinkComponent: PropTypes.func,
};

LinkList.defaultProps = {
  LinkComponent: Link,
};
