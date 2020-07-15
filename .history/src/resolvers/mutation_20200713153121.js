import bcrypt from "bcryptjs"

import User from "../models/user"
import Product from "../models/course"
import CartItem from "../models/cartItem"

const Mutation = {
    signup: async (parent, args, context, info) => {
        const email = args.email.trim().toLowerCase()
        const currentUsers = await User.find({})
        const isEmailExist =
            currentUsers.findIndex(user => user.email === email) > -1

        if (isEmailExist) {
            throw new Error("Email exste.")
        }
        if (args.password.trim().length < 6) {
            throw new Error("Password debe tener 6 caracteres.")
        }
        const password = await bcrypt.hash(args.password, 10)
        return User.create({ ...args, email, password })
    },
    createCourse: async (parent, args, { userId }, info) => {
        if (!userId) throw new Error("Ingresa por favor.")

        if (!args.description || !args.genero) {
            throw new Error("Debe tener lleno todos los campos.")
        }

        const course = await Course.create({ ...args, user: userId })
        const user = await User.findById(userId)

        if (!user.courses) {
            user.courses = [course]
        } else {
            user.courses.push(course)
        }

        await user.save()

        return Course.findById(course.id).populate({
            path: "user",
            populate: { path: "courses" }
        })
    },
    updateCourse: async (parent, args, { userId }, info) => {
        const { id, description, genero } = args
        if (!userId) throw new Error("Ingresa por favor.")
        const course = await Product.findById(id)
        if (userId !== course.user.toString()) {
            throw new Error("Tu no estas autorizado.")
        }
        const updateInfo = {
            description: !!description ? description : course.description,
            genero: !!genero ? genero : course.genero
        }
        await Product.findByIdAndUpdate(id, updateInfo)
        const updatedProduct = await Product.findById(id).populate({ path: "user" })

        return updatedProduct
    },
    addToCart: async (parent, args, { userId }, info) => {
        const { id } = args

        if (!userId) throw new Error("Ingrea por favor.")
        try {
            const user = await User.findById(userId).populate({
                path: "carts",
                populate: { path: "product" }
            })

            const findCartItemIndex = user.carts.findIndex(
                cartItem => cartItem.product.id === id
            )

            if (findCartItemIndex > -1) {
                user.carts[findCartItemIndex].quantity += 1

                await CartItem.findByIdAndUpdate(user.carts[findCartItemIndex].id, {
                    quantity: user.carts[findCartItemIndex].quantity
                })
                const updatedCartItem = await CartItem.findById(
                    user.carts[findCartItemIndex].id
                )
                    .populate({ path: "product" })
                    .populate({ path: "user" })

                return updatedCartItem
            } else {
                const cartItem = await CartItem.create({
                    product: id,
                    quantity: 1,
                    user: userId
                })
                const newCartItem = await CartItem.findById(cartItem.id)
                    .populate({ path: "product" })
                    .populate({ path: "user" })
                await User.findByIdAndUpdate(userId, {
                    carts: [...user.carts, newCartItem]
                })

                return newCartItem
            }
        } catch (error) {
            console.log(error)
        }
    },
    deleteCart: async (parent, args, { userId }, info) => {
        const { id } = args
        if (!userId) throw new Error("Ingresa por favor.")
        const cart = await CartItem.findById(id)
        const user = await User.findById(userId)
        if (cart.user.toString() !== userId) {
            throw new Error("No estas autorizado.")
        }
        const deletedCart = await CartItem.findOneAndRemove(id)
        const updatedUserCarts = user.carts.filter(
            cartId => cartId.toString() !== deletedCart.id.toString()
        )

        await User.findByIdAndUpdate(userId, { carts: updatedUserCarts })

        return deletedCart
    }
}

export default Mutation