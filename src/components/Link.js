import React from 'react';
import { graphql, Link as GatsbyLink } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES } from "@contentful/rich-text-types";
import styled, { css } from "styled-components";

const StyledGatsbyLink = styled(GatsbyLink)`
  ${props =>
    props.isButton &&
    css`
      display: inline-block;
      margin: 20px 0;
      padding: 15px 20px;
      color: #fff;
      background-color: ${props.theme.color.cta};
      border-radius: ${props.theme.border.radius.small};
      text-decoration: none;
    `
  }
`;

const options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: ({
      content: {
        "0": { value },
      },
      data: {
        target: { slug },
      },
    }) => (
      <StyledGatsbyLink to={slug} isButton={options.isButton}>
        {value}
      </StyledGatsbyLink>
    ),
  },
};

const Link = ({ linkRichText, isButton }) => {
  const allOptions = Object.assign(options, { isButton });

  return (
    renderRichText(linkRichText, allOptions)
  );
};

export const LinkFragment = graphql`
  fragment LinkFragment on ContentfulLink {
    linkRichText {
      raw
      references {
        ... on ContentfulPage {
          # contentful_id is required to resolve the references
          contentful_id
          slug
        }
      }
    }
  }
`;

export default Link;