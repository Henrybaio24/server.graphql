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
        const course = await Course.findById(id)
        if (userId !== course.user.toString()) {
            throw new Error("Tu no estas autorizado.")
        }
        const updateInfo = {
            description: !!description ? description : course.description,
            genero: !!genero ? genero : course.genero
        }
        await Product.findByIdAndUpdate(id, updateInfo)
        const updatedCourse = await Course.findById(id).populate({ path: "user" })

        return updatedCourse
    },
    
}

export default Mutation