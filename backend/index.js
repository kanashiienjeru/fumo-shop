import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { ProductController } from './controllers/index.js'


mongoose.set('strictQuery', false);
mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.1inyo9s.mongodb.net/sneakers?retryWrites=true&w=majority')
    .then(() => console.log('db ok'))
    .catch((err) => console.log(err))

const app = express()
app.use(express.json())
app.use(cors())

app.post('/products/create', ProductController.create)
app.delete('/products/del/:id', ProductController.del)


app.get('/products/getProducts', ProductController.getProducts)
app.get('/products/:id', ProductController.getOne)

app.get('/favorites', ProductController.favorites)
app.post('/favorites/add/:id', ProductController.addToFav)
app.delete('/favorites/del/:id', ProductController.delFav)

app.get('/cart', ProductController.getCart)
app.post('/cart/add/:id', ProductController.addCart)
app.delete('/cart/del/:id', ProductController.delCart)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok')
})