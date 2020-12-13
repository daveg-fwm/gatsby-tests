import React from 'react';
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import styled from "styled-components";

import Link from "../Link";

const StyledHeroContainer = styled.div`
  display: grid;
  grid-auto-columns: .5fr;
  justify-content: center;
  text-align: center;
`;

const StyledLinkWrapper = styled.div`
  margin: 20px 0;
`;

const StyledMediaContainer = styled.div`
  display: grid;
  grid-template: repeat(2, min-content) / repeat(2, min-content);
  justify-content: center;
  gap: 20px;
`;

const Hero = ({ content }) => {
  const { richText, ctaButton, media } = content;

  return (
    <StyledHeroContainer>
      {renderRichText(richText, {})}

      <StyledLinkWrapper>
        <Link linkRichText={ctaButton.linkRichText} isButton />
      </StyledLinkWrapper>

      <StyledMediaContainer>
        {media.map((image, imageIndex) => (
          <Img key={`heroImage-${imageIndex}`} fixed={image.fixed} alt={image.title} />
        ))}
      </StyledMediaContainer>
    </StyledHeroContainer>
  );
};

export const ComponentHeroFragment = graphql`
  fragment ComponentHeroFragment on ContentfulComponentHero {
    richText {
      raw
    }
    ctaButton {
      ...LinkFragment
    }
    media {
      title
      fixed(width: 140, height: 140, quality: 80) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
  }
`;

export default Hero;