import React from "react";
import { graphql } from "gatsby";

import BlockArticles from "./blocks/BlockArticles";

const ContentBlocks = (props) => (
  <>
    {props.contentBlocks.reduce(
      (blocksToRender, contentBlock, index) => {
        switch (contentBlock.type) {
          case "ContentfulBlockCustomerReviews":
            blocksToRender.push(
              <BlockCustomerReviews
                key={index}
                contentBlock={contentBlock}
              />
            );
            break;
          default:
            break;
        }
        return blocksToRender;
      }, [])
    }
  </>
);

export const ContentBlocksFragment = graphql`
  fragment ContentBlocksFragment on Node {
    id
    type: __typename
    ... on ContentfulBlockHero {
      ...BlockHero_ContentfulBlockHero
    }
  }
`;

export default ContentBlocks;
