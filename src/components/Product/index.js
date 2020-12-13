import React from 'react';
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import styled from "styled-components";

import { StyledButton } from "../Link";

const StyledProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
`;

const StyledPrice = styled.p`
  font-size: ${props => props.theme.font.size.big};
`;

const Product = ({ content }) => {
  const { image, name, descriptionRichText, price, purchaseUrl} = content;

  return (
    <StyledProductContainer>
      <Img fluid={image.fluid} alt={image.title} />

      <div>
        <h1>{name}</h1>
        {renderRichText(descriptionRichText, {})}
        <StyledPrice>{price}</StyledPrice>
        <StyledButton href={purchaseUrl} target="_blank">Buy product</StyledButton>
      </div>
    </StyledProductContainer>
  );
};

export const ComponentProductFragment = graphql`
  fragment ComponentProductFragment on ContentfulComponentProduct {
    image {
      title
      fluid(maxWidth: 600, quality: 80) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    name
    descriptionRichText {
      raw
    }
    price
    purchaseUrl
  }
`;

export default Product;