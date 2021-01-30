const fs = require('fs');
const path = require("path");

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
        name: {
          type: "String!",
          args: {
            showModelCode: "Boolean",
          },
          resolve: (source, args, context, info) => {
            const nameWithCode = `${source.name} - ${source.code}`;

            return args.showModelCode ? nameWithCode  : source.name;
          },
        },
      },
    }),
  ];

  actions.createTypes(typeDefs);

  /*
   * Only creates the types necessary to recreate all type definitions.
   * Does not include directives, built-ins, and derived types for filtering, sorting, pagination etc.
   */
  fs.unlink('./schema.gql', (err) => {
    if (err) {
      console.info("Creating schema file for the first time! :D");
    }

    actions.printTypeDefinitions({});
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const pageTemplate = path.resolve("src/templates/Page.js");

  const result = await graphql(`
    {
      allContentfulPage(filter: { slug: { ne: null } }) {
        edges {
          node {
            slug
            node_locale
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const { allContentfulPage } = result.data;

  allContentfulPage.edges.forEach((edge) => {
    const { slug, node_locale } = edge.node;

    actions.createPage({
      component: pageTemplate,
      context: {
        slug,
        locale: node_locale,
      },
      path: slug,
    });
  });
};