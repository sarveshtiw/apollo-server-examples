const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubsub = new PubSub();
const SOMETHING_CHANGED_TOPIC = 'something_changed';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello',
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
 //optional parameter
  onHealthCheck: () =>
    new Promise((resolve, reject) => {
      //database check or other asynchronous action
    }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(
    `Try your health check at: ${url}.well-known/apollo/server-health`,
  );
});
