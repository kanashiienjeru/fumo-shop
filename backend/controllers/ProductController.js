import ProductModel from "../models/ProductModel.js";
import FavModel from "../models/FavModel.js";
import CartModel from "../models/CartModel.js";


export const create = async (req, res) => {
    try {
        const doc = new ProductModel({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
        })

        const product = await doc.save()
        res.json(product)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось создать продукт"
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()

        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось получить список товаров'
        })
    }
}

export const del = async (req, res) => {
    try {
        const productId = req.params.id
        ProductModel.findByIdAndDelete({
            _id: productId,
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось удалить продукт'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Продукт не найден'
                })
            }

            res.json({
                message: 'Продукт удалён'
            })
        })
    } catch (error) {
    }

}
export const getOne = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await ProductModel.findById(productId)
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось найти товар'
        })
    }
}



export const addToFav = async (req,res) => {
    const productId = req.params.id
    if (!productId) {
        return res.status(400).json({
            message: 'Укажите Id'
        })
    }

    const candidate = await FavModel.findOne({ product: productId})
    if (candidate) {
        return res.status(500).json({
            message: 'Продукт уже добавлен в избранные'
        })
    }
    await FavModel.create({
        product: productId
    })

    const favProduct = await FavModel.findOne({ product: productId}).populate('product').exec()
    res.json(favProduct)
}

export const favorites = async (req,res) => {
    const favProducts = await FavModel.find().populate('product').exec()
    res.json(favProducts)
}

export const delFav = async (req,res) => {
    const productId = req.params.id
    const productq = await FavModel.findOne({ product: productId })
    if (!productq) {
        return res.status(404).json({
            message: 'Товара нет в избранных'
        })
    }
    await FavModel.deleteOne({ product: productId })
    res.json({
        message: 'Продукт удалён из избранных'
    })
}

export const addCart = async (req,res) => {
    const productId = req.params.id
    if (!productId) {
        return res.status(400).json({
            message: 'Укажите Id'
        })
    }

    const candidate = await CartModel.findOne({ product: productId})
    if (candidate) {
        return res.status(500).json({
            message: 'Продукт уже добавлен в избранные'
        })
    }
    await CartModel.create({
        product: productId
    })

    const cartProduct = await CartModel.findOne({ product: productId}).populate('product').exec()
    res.json(cartProduct)
}

export const delCart = async (req,res) => {
    const productId = req.params.id
    const product = await CartModel.findOne({ product: productId })
    if (!product) {
        return res.status(404).json({
            message: 'Товара нет в избранных'
        })
    }
    await CartModel.deleteOne({ product: productId })
    res.json({
        message: 'Продукт удалён из избранных'
    })
}

export const getCart = async (req,res) => {
    const products = await CartModel.find().populate('product').exec()
    res.json(products)
}