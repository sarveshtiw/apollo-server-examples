const { ApolloServer, gql, ApolloError, ForbiddenError, AuthenticationError } = require("apollo-server");

const typeDefs = gql`
  type Query {
    allTodos: String
  }

  type Mutation {
    addTodo: String
  }
`;

const resolvers = {
  Query: {
    allTodos: (root, args, context) => {
      if (!context.scope) {
        throw new AuthenticationError("You must be logged in to see all todos");
      }

      if (context.scope !== "ADMIN") {
        throw new ForbiddenError("You must be an administrator to see all todos");
      }

      return context.Todos.getAllTodos();
    },
  },
  Mutation: {
    addTodo: (root, args, context) => {
      if(!context.Todos.idAvailable(args.id)) {
        throw new ApolloError('The id is already taken', 'DUPLICATE_KEY',  {field: 'id'});
      }

      return context.Todos.addTodo(args.id, args.todo);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
