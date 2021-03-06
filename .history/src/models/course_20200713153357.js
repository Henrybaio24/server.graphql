import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})

const Product = mongoose.model("Course", productSchema)

export default Product