import User from '../models/user'
import Product from '../models/product'

const Query = {
    // me: (parent, args, context, info) => me,
    user: (parent, args, context, info) => User.findById(args.id),
    users: (parent, args, context, info) => User.find({}),
    product: (parent, args,context, info) => 
    Product.findById(args.id).populate({
        path: "user",
        populate: { path: "products"}
    }),
    products: (parent, args)
}

export default Query