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
    iamgeUrl: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mo
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product