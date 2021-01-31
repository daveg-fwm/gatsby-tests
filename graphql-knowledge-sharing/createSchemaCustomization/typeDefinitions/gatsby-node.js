/*
 * Create type definitions using GraphQL syntax in Gatsby.
 * Not ideal because we lose syntax highlighting.
 */
exports.createSchemaCustomization = ({ actions }) => {
  const typeDefs = `
    type ContentfulContentBlock implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
      contentful_id: String!
      node_locale: String!
      entryTitle: String
      richText: ContentfulContentBlockRichText
      numberOfColumns: Int
      components: [ContentfulComponentCardContentfulComponentHeroContentfulComponentProductUnion] @link(by: "id", from: "components___NODE")
      page: [ContentfulPage] @link(by: "id", from: "page___NODE")
      spaceId: String
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulContentBlockSys
    }
  `;

  actions.createTypes(typeDefs);
}