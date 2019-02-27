/** @jsx jsx */
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

export function Button(props) {
  return (
    <button {...{
      ...props,
      css: css`
        padding: .5em 1em;
        white-space: nowrap;
      `,
    }} />
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  type: 'button',
};

export const MiniButton = styled(Button)`
  padding: 0 .4em;
`;
