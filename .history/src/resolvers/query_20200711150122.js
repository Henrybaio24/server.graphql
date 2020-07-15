import User from '../models/user'
import product from '../models/product'

const Query = {
    // me: (parent, args, context, info) => me,
    user: (parent, args, context, info) => User.findById(args.id),
    users: (parent, args, context, info) => User.find({})
    product: (parent)
}

export default Query