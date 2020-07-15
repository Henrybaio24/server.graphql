const resolvers = {
    Query: {
        me: (parent, args, context, info) => me,
        user: (parent, args, context, info)
    }
}