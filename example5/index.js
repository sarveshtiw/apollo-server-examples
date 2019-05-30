const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    resolved: String
  }
`;

const resolvers = {
  Query: {
     hello: () => 'Hello',
     resolved: () => 'Resolved',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {    apiKey: 'service:sarveshtiw-6925:LvWWXfPEsX6DQM3UjWsB1A',  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
