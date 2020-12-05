import React from 'react';
import { graphql } from "gatsby";

import ContentBlocks from "../components/ContentBlocks";
import Layout from "../components/Layout";

const page = ({ pageContext, data }) => {
  const { locale } = pageContext;
  const { header, contentBlocks, footer } = data;

  return (
    <Layout
      seo={{
        lang: locale.substr(0, 2)
      }}
      header={header}
      footer={footer}
    >
      <ContentBlocks contentBlocks={contentBlocks} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageQuery($slug: String!) {
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
`;

export default page;