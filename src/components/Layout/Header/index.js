import React from 'react';
import { graphql } from "gatsby";

import DefaultHeader from './DefaultHeader';

const Header = ({ data }) => {
  const { category } = data;

  return (
    <>
      {category === "Default" && (
        <DefaultHeader data={data} />
      )}
    </>
  );
};

export const HeaderFragment = graphql`
  fragment HeaderFragment on ContentfulHeader {
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

export default Header;