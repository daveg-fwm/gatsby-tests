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

### Be consistent and precise!

- always use the spread operator when using fragments (separation of concerns)
- always use inline fragments when a field can be more than one type
- optional **unused** fields should always have a resolver (dummy content may be better for CMS data)

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