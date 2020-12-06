import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import theme from "../../theme";
import Seo from "./Seo";

const GlobalStyles = createGlobalStyle`
  html {
    font-family: ${props => props.theme.font.family};
    font-size: 10px;
    line-height: ${props => props.theme.font.lineHeight.body};
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: inherit;

    &:before,
    &:after {
      box-sizing: inherit;
    }
  }

  p {
    font-size: ${props => props.theme.font.size.body};
    margin-top: 0;
  }

  h1 {
    font-size: ${props => props.theme.font.size.huge};
  }

  h2 {
    font-size: ${props => props.theme.font.size.big};
  }

  h3 {
    font-size: ${props => props.theme.font.size.medium};
  }

  h1,
  h2,
  h3 {
    line-height: ${props => props.theme.font.lineHeight.heading};
    margin-top: 0;
  }
`;

const StyledMain = styled.main`
  max-width: ${props => props.theme.layout.container.width};
  margin: 100px auto;
`;

const Layout = ({ children, seo }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Seo seo={seo} />
    <StyledMain>{children}</StyledMain>
  </ThemeProvider>
);

export default Layout;
