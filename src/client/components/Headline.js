/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

function Headline({ tagName, ...restProps }) {
  const Tag = tagName;
  return (
    <Tag {...{
      ...restProps,
      css: css`
        display: block;
        margin: 1em 0 .25em;
        font-size: 1.8rem;
        font-weight: bold;
      `,
    }} />
  );
}

Headline.propTypes = {
  tagName: PropTypes.string.isRequired,
};

export const PrimaryHeadline = styled(Headline)``;

PrimaryHeadline.defaultProps = {
  tagName: 'h1',
};

export const SecondaryHeadline = styled(Headline)`
  font-size: 1.2rem;
`;

SecondaryHeadline.defaultProps = {
  tagName: 'h2',
};

export const TertiaryHeadline = styled(Headline)`
  margin: .5em 0 0;
  font-size: 1rem;
`;

TertiaryHeadline.defaultProps = {
  tagName: 'h3',
};


