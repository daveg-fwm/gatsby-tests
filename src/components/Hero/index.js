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

const StyledMediaContainer = styled.div`
  display: grid;
  grid-template: repeat(2, min-content) / repeat(2, min-content);
  justify-content: center;
  gap: 20px;
`;

const Hero = ({ content }) => {
  return (
    <StyledHeroContainer>
      {renderRichText(content.richText, {})}
      <Link linkRichText={content.ctaButton.linkRichText} isButton />

      <StyledMediaContainer>
        {content.media.map((image, imageIndex) => (
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