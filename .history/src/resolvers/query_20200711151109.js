import User from '../models/user'
import Product from '../models/product'

const Query = {
    // me: (parent, args, context, info) => me,
    user: (parent, args, context, info) => User.findById(args.id),
    users: (parent, args, context, info) => User.find({}),
    
}

export default Query