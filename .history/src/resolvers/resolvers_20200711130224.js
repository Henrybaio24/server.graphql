import User from '../models/user'

const Query = {

}

const resolvers = {
    Query: {
       ,
    Mutation: {
        signup: (parent, args, context, info) => {
            return User.create(args)
        }
    }
}

export default resolvers