const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userData = require('./MOCK_DATA.json');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const { graphqlHTTP } = require('express-graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: { type: GraphQLInt },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } }, // to do comment this line
            resolve(parent, args) {
                // Here we can write code to get data from database / other source
                // all logic to get data from database / other source
                return userData;
            }
        },
        getUserById: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                // Here we can write code to get data from database / other source
                // all logic to get data from database / other source
                return userData.find(user => user.id === args.id);
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                // here put logic to save data in database / other source
                // all logic to save data in database / other source
                userData.push({
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                })
                return args;
            }
        },
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // for graphql gui
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
