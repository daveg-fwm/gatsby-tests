import React from "react";
import { graphql, Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES } from "@contentful/rich-text-types";

const options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: ({
      content: {
        "0": { value },
      },
      data: {
        target: { slug },
      },
    }) => <Link to={slug}>{value}</Link>,
  },
}

const DefaultHeader = ({ data }) => (
  <header>
    <Link to="/">
      <img src={data.logo.file.url} alt="Gatsby Tests" />
    </Link>

    <ul>
      {data.links.map((link, index) => (
        <li key={index}>
          {renderRichText(link.linkRichText, options)}
        </li>
      ))}
    </ul>
  </header>
);

export const DefaultHeaderFragment = graphql`
  fragment DefaultHeaderFragment on ContentfulHeader {
    logo {
      file {
        url
      }
    }
    links {
      linkRichText {
        raw
        references {
          ... on ContentfulPage {
            # contentful_id is required to resolve the references
            contentful_id
            slug
          }
        }
      }
    }
  }
`;

export default DefaultHeader;
