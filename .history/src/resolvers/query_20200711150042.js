import User from '../models/user'
import product from 

const Query = {
    // me: (parent, args, context, info) => me,
    user: (parent, args, context, info) => User.findById(args.id),
    users: (parent, args, context, info) => User.find({})
    product: ()
}

export default Query