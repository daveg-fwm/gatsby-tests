import React from 'react';
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import DefaultHeader from "../components/Layout/DefaultHeader";
import DefaultFooter from "../components/Layout/DefaultFooter";
import ContentBlocks from "../components/ContentBlocks";

const page = ({ pageContext, data }) => {
  const { locale } = pageContext;
  const { header, contentBlocks, footer } = data.contentfulPage;

  return (
    <Layout
      seo={{
        lang: locale.substr(0, 2)
      }}
      header={header}
      footer={footer}
    >
      <DefaultHeader data={header} />
        <main>
          <ContentBlocks contentBlocks={contentBlocks} />
        </main>
      <DefaultFooter data={footer} />
    </Layout>
  );
}

export const PageQuery = graphql`
  query PageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      header {
        ...DefaultHeaderFragment
      }
      contentBlocks {
       ...ContentBlocksFragment
      }
      footer {
        ...DefaultFooterFragment
      }
    }
  }
`;

export default page;