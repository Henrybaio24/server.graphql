import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user"
import Product from "../models/course"

const Query = {
  login: async (parent, args, context, info) => {
    const { email, password } = args
    const user = await User.findOne({ email })

    if (!user) throw new Error("Email no exite.")
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) throw new Error("Invalido email o password.")

    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
      expiresIn: "7days"
    })

    return { userId: user.id, jwt: token }
  },
  user: (parent, args, { userId }, info) => {
    if (!userId) throw new Error("Ingresa")

    if (userId !== args.id) throw new Error("No autorizado.")

    return User.findById(args.id)
      .populate({
        path: "courses",
        populate: { path: "user" }
      })
  },
  users: (parent, args, context, info) =>
    User.find({})
      .populate({
        path: "courses",
        populate: { path: "user" }
      })
      .populate({ path: "carts", populate: { path: "product" } }),
  product: (parent, args, context, info) =>
    Product.findById(args.id).populate({
      path: "user",
      populate: { path: "products" }
    }),
  products: (parent, args, context, info) =>
    Product.find().populate({
      path: "user",
      populate: { path: "products" }
    })
}

export default Query