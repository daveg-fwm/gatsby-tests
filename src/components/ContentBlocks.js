import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Hero from "./Hero";

const StyledSection = styled.section`
  &:not(:first-of-type) {
    margin-top: 60px;
  }
`;

const ContentBlocks = ({ contentBlocks }) => {
  return (
    <>
      {contentBlocks.map((contentBlock, blockIndex) => (
        <StyledSection key={`contentBlock-${blockIndex}`}>
          {contentBlock.components.reduce(
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
                default:
                  break;
              }
              return componentsToRender;
            }, []
          )}
        </StyledSection>
      ))}
    </>
  );
};

export const ContentBlocksFragment = graphql`
  fragment ContentBlocksFragment on ContentfulContentBlock {
    components {
      type: __typename
      ... on ContentfulComponentHero {
        ...ComponentHeroFragment
      }
    }
  }
`;

export default ContentBlocks;
