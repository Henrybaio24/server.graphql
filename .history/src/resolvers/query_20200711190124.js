import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import Product from '../models/product'

const Query = {
    login: (parent, args, context, info) => {
        const {email, password} = args

        const user = await User.findOne({email})

        if(!user) {
            throw new Error('Email fallido, ingresa')
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) {
            throw new Error('Invalido email o password')
        }

        jwt.sign({userId: user.id}, process.env.SECRET, {expiresIn})
    },
    user: (parent, args, context, info) => User.findById(args.id)
        .populate({
            path: "products",
            populate: { path: "user" }
        })
        .populate({ path: "carts", populate: { path: "product" } }),
    users: (parent, args, context, info) => User.find({}).populate({
            path: "products",
            populate: { path: "user" }
        }).populate({ path: "carts", populate: { path: "product" } }),
    product: (parent, args, context, info) =>
        Product.findById(args.id).populate({
            path: "user",
            populate: { path: "products" }
        }),
    products: (parent, args, context, info) =>
        Product.find().populate({
            path: "user",
            populate: { path: "products" }
        }),
}

export default Query