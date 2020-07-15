import bcrypt from 'bcryptjs'
import User from '../models/user'
import Product from '../models/product'

const Mutation = {
    signup: async (parent, args, context, info) => {

        const email = args.email.trim().toLowerCase()

        const currentUsers = await User.find({})
        const isEmailExist = currentUsers.findIndex(user => user.email === email ) > -1
        
        if (isEmailExist) {
            throw new Error('Email existe')
        }

        if (args.password.trim().length < 6){
            throw new Error('Password debe tener 6 caracteres')
        }

        const password = await bcrypt.hash(args.password, 10)
        
        return User.create({...args, email, password})
    },
    createProduct: async (parent, args, context, info) => {
        const userId = "5f09fd6f7e924e29608ecfbc"
        if(!args.description || !args.price || !args.imageUrl) {
            throw new Error('Campos requeridos')
        }
        const product = await Product.create({...args, user: userId})
        const user = await User.findById(userId)

        if(!user.products) {
            user.products = [product]
        } else {
            user.products.push(product)
        }

        await user.save()

        return Product.findById(product.id).populate({path: "user", populate: {path:"products"}})
    }
}

export default Mutation