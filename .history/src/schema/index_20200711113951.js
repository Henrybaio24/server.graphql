import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        me: User!
        user(id: ID!): user
        users: [User]!
    }

    type User {
        id: ID
    }
`