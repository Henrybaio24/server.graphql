import bcrypt from 'bcryptjs'
import User from '../models/user'

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
    create
}

export default Mutation