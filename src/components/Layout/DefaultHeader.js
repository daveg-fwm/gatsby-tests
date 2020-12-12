import React from "react";
import { graphql, Link as GatsbyLink } from "gatsby";
import styled from "styled-components";

import Link from "../Link";

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 200px auto;
  justify-content: space-between;
  padding: 20px 40px;
`;

const StyledLogo = styled.img`
  height: 40px;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: grid;
  grid-auto-flow: column;
  column-gap: 20px;
`;

const StyledLi = styled.li`
  * {
    height: 100%;
  }

  p {
    margin-bottom: 0;
  }

  a {
    display: flex;
    align-items: center;
  }
`;

const DefaultHeader = ({ data }) => {
  return (
    <StyledHeader>
      <GatsbyLink to="/">
        <StyledLogo src={data.logo.file.url} alt="Gatsby Tests" />
      </GatsbyLink>

      <StyledUl>
        {data.links.map((link, index) => (
          <StyledLi key={index}>
            <Link linkRichText={link.linkRichText} />
          </StyledLi>
        ))}
      </StyledUl>
    </StyledHeader>
  );
};

export const DefaultHeaderFragment = graphql`
  fragment DefaultHeaderFragment on ContentfulHeader {
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

export default DefaultHeader;
