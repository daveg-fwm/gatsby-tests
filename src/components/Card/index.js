import React, { Fragment } from 'react';
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import { StyledGatsbyLinkButton } from "../Link";

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: ${props => props.theme.border.radius.medium};
  box-shadow: ${props => props.theme.shadow};
  overflow: hidden;
`;

const StyledCardInner = styled.div`
  padding: 20px;
`;

const StyledCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const StyledPrice = styled.p`
  font-size: ${props => props.theme.font.size.big};
  margin-bottom: 0;
`;

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      children.map((child, childIndex) => {
        const emptyContent = !child || child === "";

        return !emptyContent && (
          <Fragment key={`blocksParagraph-${childIndex}`}>{child}</Fragment>
        );
      })
    ),
    [INLINES.ENTRY_HYPERLINK]: ({
      content: {
        "0": { value },
      },
      data: {
        target: {
          contentBlocks: {
            "0": {
              components: {
                "0": {
                  cardSummaryRichText,
                  image: { fluid, title },
                  name,
                  price,
                }
              },
            },
          },
          slug,
        },
      },
    }) => {
      return value !== "" && (
        <StyledCard>
          <Img fluid={fluid} alt={title} />

          <StyledCardInner>
            <h3>{name}</h3>
            {renderRichText(cardSummaryRichText, {})}

            <StyledCardFooter>
              <StyledGatsbyLinkButton to={slug}>View product</StyledGatsbyLinkButton>
              <StyledPrice>{price}</StyledPrice>
            </StyledCardFooter>
          </StyledCardInner>
        </StyledCard>
      );
    },
  },
};

const Card = ({ content }) => {
  const { richText } = content;

  return (
    <>
      {renderRichText(richText, options)}
    </>
  );
};

export const ComponentCardFragment = graphql`
  fragment ComponentCardFragment on ContentfulComponentCard {
    richText {
      raw
      references {
        ... on ContentfulPage {
          # contentful_id is required to resolve the references
          contentful_id
          slug
          contentBlocks {
            components {
              ... on ContentfulComponentProduct {
                image {
                  title
                  fluid(maxWidth: 300, quality: 80) {
                    ...GatsbyContentfulFluid_withWebp
                  }
                }
                name
                cardSummaryRichText {
                  raw
                }
                price
              }
            }
          }
        }
      }
    }
  }
`;

export default Card;