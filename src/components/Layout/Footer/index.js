import React from 'react';
import { graphql } from "gatsby";

import DefaultFooter from './DefaultFooter';

const Footer = ({ data }) => {
  const { category } = data;

  return (
    <>
      {category === "Default" && (
        <DefaultFooter data={data} />
      )}
    </>
  );
};

export const FooterFragment = graphql`
  fragment FooterFragment on ContentfulFooter {
    category
    logo {
      file {
        url
      }
    }
    links {
      ...LinkFragment
    }
  }
`;

export default Footer;