exports.createSchemaCustomization = ({ actions, schema }) => {
  const typeDefs = [
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
}