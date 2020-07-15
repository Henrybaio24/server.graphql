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
        type: mongoose.Schema.Types.ObjectId,
        
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product