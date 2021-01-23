import React from 'react';
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ContentBlocks from "../components/ContentBlocks";

const Page = ({ pageContext, data }) => {
  const { locale } = pageContext;
  const { header, contentBlocks, footer } = data.contentfulPage;

  return (
    <Layout
      seo={{
        lang: locale.substr(0, 2)
      }}
    >
      <Header data={header} />
        <main>
          <ContentBlocks contentBlocks={contentBlocks} />
        </main>
      <Footer data={footer} />
    </Layout>
  );
}

export const PageQuery = graphql`
  query PageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      header {
        ...HeaderFragment
      }
      contentBlocks {
       ...ContentBlocksFragment
      }
      footer {
        ...FooterFragment
      }
    }
  }
`;

export default Page;