/*
 * Type Builders
 * https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#gatsby-type-builders
 */
exports.createSchemaCustomization = ({ actions, schema }) => {
  const typeDefs = [
    schema.buildObjectType({
      name: "ContentfulPage",
      fields: {
        slug: {
          type: "String!",
          resolve: source => {
            const { slug, category } = source;
            const ignoredCategories = ["none", "home"];

            if (!ignoredCategories.includes(category)) {
              const validSlug = slug.startsWith(`/${category}/`);

              return !validSlug ? `/${category}${slug}` : slug;
            }

            return slug;
          },
        },
      },
    }),
    schema.buildObjectType({
      name: "ContentfulComponentProduct",
      fields: {
        purchaseUrl: {
          type: "String!",
          resolve: source => process.env.PURCHASE_URL.replace("{code}", source.code),
        },
      },
    }),
  ];

  actions.createTypes(typeDefs);
}

// PURCHASE_URL=https://www.paymentgateway.com/{code}/