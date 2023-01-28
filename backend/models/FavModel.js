import { Schema, model } from 'mongoose'

const favSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

export default model('Favorite', favSchema)