import User from '../models/user'

const Query = {
    me: (parent, args, context, info) => me,
    user: (parent, args, context, info) => {
        const id = args.id
        const user = users.find(u => u.id === id)

        return user
    },
    users: (parent, args, context, info) => users
}

const resolvers = {
    Query: {
    }
    Mutation: {
        signup: (parent, args, context, info) => {
            return User.create(args)
        }
    }
}

export default resolvers