# GraphQL Knowledge Sharing

<br>

### GraphQL is _explicit_ and _type safe_ which means:

- it can only know what you tell it to know ie: data type definitions
- it can only validate, manipulate or transform data if you tell it to ie: data resolvers

<br>

### Is this good or bad?

It can result in more work, **but** it means that we have complete control over
what data we fetch and how we use it.

If there is an error we can be sure there is an issue with the implementation of
our code and/or queries and debug according to the error message.

GraphQL was specifically made this way so we always know exactly how our
applications are using data. This ensures total data integrity within our apps
and makes tracking bugs much easier.

**This is absolutely a good thing!** 🙂

<br>

### Queries & Mutations

CRUD: four basic functions of persistent storage
- **C**reate
- **R**ead
- **U**pdate
- **D**elete

GraphQL queries are used to `read` data, the `R` in CRUD.<br>
GraphQL mutations are used to `create` new data, `update` existing data or `delete` data.

Both queries and mutations can have resolvers.

<a href="https://graphql.org/learn/queries/" target="_blank">https://graphql.org/learn/queries/</a>

<br>

### Be consistent and precise!

- always use the spread operator when using fragments (separation of concerns)
- always use inline fragments when a field can be more than one type and the type itself is not a fragment
- **unused** fields should always have a resolver (dummy content may be better for CMS data)

<br>


### Benefits of resolvers

- all data validation, manipulation or transformation is well organised in a single location
- keeps the codebase clean and easily maintainable at scale
- resolvers are JS functions which means you can put anything inside them including API calls

<a href="https://graphql.org/learn/execution/#root-fields-resolvers" target="_blank">https://graphql.org/learn/execution/#root-fields-resolvers</a>

<br>

### Useful Gatsby Docs

- <a href="https://www.gatsbyjs.com/docs/graphql-reference/" target="_blank">https://www.gatsbyjs.com/docs/graphql-reference/</a>
- <a href="https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#gatsby-type-builders" target="_blank">https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#gatsby-type-builders</a>

For more advanced resolvers use the `createResolvers` API:

<a href="https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#createresolvers-api" target="_blank">https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#createresolvers-api</a>

<br>

### Industry-standard platform for GraphQL Client/Server

- <a href="https://www.apollographql.com/" target="_blank">https://www.apollographql.com/</a>
- <a href="https://www.apollographql.com/docs/" target="_blank">https://www.apollographql.com/docs/</a>

<br>

### Recommended course

<a href="https://frontendmasters.com/courses/server-graphql-nodejs/" target="_blank">https://frontendmasters.com/courses/server-graphql-nodejs/</a>