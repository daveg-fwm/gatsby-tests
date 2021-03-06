import React from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";

import Link from "../../Link";

const StyledFooter = styled.footer`
  display: grid;
  justify-items: center;
  row-gap: 20px;
  padding: 40px 0 20px;
  background-color: #eee;
`;

const StyledLogo = styled.img`
  height: 30px;
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
    height: 60px;
  }

  p {
    margin-bottom: 0;
  }

  a {
    display: flex;
    align-items: center;
  }
`;

const StyledCopyright = styled.p`
  margin-bottom: 0;
  font-size: 1.4rem;
`;

const DefaultFooter = ({ data }) => {
  const { logo, links } = data;

  return (
    <StyledFooter>
      <GatsbyLink to="/">
        <StyledLogo src={logo.file.url} alt="Gatsby Tests" />
      </GatsbyLink>

      <StyledUl>
        {links.map((link, linkIndex) => (
          <StyledLi key={`footerLink-${linkIndex}`}>
            <Link linkRichText={link.linkRichText} />
          </StyledLi>
        ))}
      </StyledUl>

      <StyledCopyright>©{new Date().getFullYear()} Gatsby Tests</StyledCopyright>
    </StyledFooter>
  );
};

export default DefaultFooter;
