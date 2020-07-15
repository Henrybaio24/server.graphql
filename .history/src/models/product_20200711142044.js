import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product