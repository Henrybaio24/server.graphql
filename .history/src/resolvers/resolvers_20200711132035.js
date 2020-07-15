import bcrypt from 'bcryptjs'
import User from '../models/user'

const Query = {
    // me: (parent, args, context, info) => me,
    user: (parent, args, context, info) => User.findById(args.id),
    users: (parent, args, context, info) => User.find({})
}

const Mutation = {
    signup: (parent, args, context, info) => {

        const email = args.email.trim().toLowerCase()

        const currentUsers = await User.find({})
        const emailExist = currentUsers.findIndex(user => user.email === email ) > -1
        
        if(emailExist) {
            throw new Error('Email existe')
        }

        if (args.password.trim().length < 6){
            throw new Error('Password debe tener 6 caracteres')
        }

        const password = await bcrypt.
        
        return User.create(args)
    }
}

const resolvers = {
    Query,
    Mutation
}

export default resolvers