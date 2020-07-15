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
    createProduct: (parent, args, context, info) => {
        const userId = ""
        if(!args.description || !args.price || !args.imgUrl) {
            throw new Error('Campos requeridos')
        }
        const product = await Product.create({...args, user: userId})
        const user = await User.findById(userId)

        if(!)
    }
}

export default Mutation