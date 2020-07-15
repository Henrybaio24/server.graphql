const resolvers = {
    Query: {
        me: (parent, args, context, info) => me,
        user: (parent, args, context, info) => {
            const id = args.id
            const user = users.find(u => u.id === id)

            return user
        },
        users: (parent, args, context, info) => users
    },
    Mutation: {
        signup: ()
    }
}