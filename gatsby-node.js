exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    schema.buildObjectType({
      name: "ContentfulComponentProduct",
      fields: {
        name: "String!",
        // cardSummary: {
        //   raw: "JSON!"
        // },
        // description: {
        //   raw: "String!"
        // },
        price: "String!",
        purchaseUrl: {
          type: "String!",
          resolve: source => process.env.PURCHASE_URL.replace("{code}", source.code),
        },
      },
    }),
  ]
  createTypes(typeDefs)
}