import React from 'react';
import { graphql, Link as GatsbyLink } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES } from "@contentful/rich-text-types";
import styled, { css } from "styled-components";

const buttonStyles = css`
  display: inline-block;
  padding: 15px 20px;
  color: #fff;
  background-color: ${props => props.theme.color.cta};
  border-radius: ${props => props.theme.border.radius.small};
  text-decoration: none;
  text-align: center;
`

export const StyledGatsbyLinkButton = styled(GatsbyLink)`
  ${buttonStyles};
`;

export const StyledButton = styled.a`
  ${buttonStyles};
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
    }) => {
      if (options.isButton) {
        return (
          <StyledGatsbyLinkButton to={slug}>
            {value}
          </StyledGatsbyLinkButton>
        );
      }

      return (
        <GatsbyLink to={slug}>{value}</GatsbyLink>
      );
    },
  },
};

const Link = ({ children, linkRichText, isButton, href, target }) => {
  const allOptions = Object.assign(options, { isButton });

  if (!linkRichText) {
    return (
      <a href={href} target={target ? target : "_self"}>
        {children}
      </a>
    );
  }

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