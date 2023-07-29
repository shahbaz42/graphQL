const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

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

module.exports = UserType;