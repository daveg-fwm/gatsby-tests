import React from "react";
import { graphql } from "gatsby";
import styled, { css } from "styled-components";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";

import Hero from "./Hero";
import Card from "./Card";
import Product from "./Product";

const StyledSection = styled.section`
  display: grid;
  row-gap: 50px;

  ${props =>
    props.numberOfColumns > 1 &&
    css`
      column-gap: ${props => 100 / props.numberOfColumns}px;
    `
  };

  &:not(:first-of-type) {
    margin-top: 100px;
  }
`;

const StyledRichTextContainer = styled.div`
  grid-column: 1 / span ${props => props.numberOfColumns};
`;

const StyledP = styled.p`
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => {
      if (children[0] !== "") {
        return <StyledP>{children}</StyledP>;
      }
    },
  },
};

const ContentBlocks = ({ contentBlocks }) => {
  return (
    <>
      {contentBlocks.map((contentBlock, blockIndex) => {
        const { numberOfColumns, richText, components } = contentBlock;

        return (
          <StyledSection key={`contentBlock-${blockIndex}`} numberOfColumns={numberOfColumns}>
            {richText && (
              <StyledRichTextContainer numberOfColumns={numberOfColumns}>
                {renderRichText(richText, options)}
              </StyledRichTextContainer>
            )}

            {components.reduce(
              (componentsToRender, component, componentIndex) => {
                switch (component.type) {
                  case "ContentfulComponentHero":
                    componentsToRender.push(
                      <Hero
                        key={`hero-${componentIndex}`}
                        content={component}
                      />
                    );
                    break;
                  case "ContentfulComponentCard":
                    componentsToRender.push(
                      <Card
                        key={`card-${componentIndex}`}
                        content={component}
                      />
                    );
                    break;
                  case "ContentfulComponentProduct":
                    componentsToRender.push(
                      <Product
                        key={`product-${componentIndex}`}
                        content={component}
                      />
                    );
                    break;
                  default:
                    break;
                }
                return componentsToRender;
              }, []
            )}
          </StyledSection>
        )}
      )}
    </>
  );
};

export const ContentBlocksFragment = graphql`
  fragment ContentBlocksFragment on ContentfulContentBlock {
    richText {
      raw
    }
    components {
      type: __typename
      ... on ContentfulComponentHero {
        ...ComponentHeroFragment
      }
      ... on ContentfulComponentCard {
        ...ComponentCardFragment
      }
      ... on ContentfulComponentProduct {
        ...ComponentProductFragment
      }
    }
    numberOfColumns
  }
`;

export default ContentBlocks;
