import User from '../models/user'

const Query = {
    // me: (parent, args, context, info) => me,
    user: (parent, args, context, info) => User.findById(args.id),
    users: (parent, args, context, info) => User.find({})
}

const Mutation = {
    signup: (parent, args, context, info) => {

        const email = args.email.trim().toLowerCase()

        const curre
        return User.create(args)
    }
}

const resolvers = {
    Query,
    Mutation
}

export default resolvers