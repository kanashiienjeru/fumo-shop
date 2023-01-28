import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

export default model('Cart', cartSchema)