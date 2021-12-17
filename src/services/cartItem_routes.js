import express from 'express'
import { Op, fn, col } from 'sequelize'
import { CartItem, Product, User } from '../db/models/index.js'

const cartItemRouter = express.Router({ mergeParams: true })

cartItemRouter.post('/', async (req, res, next) => {
    try {
        const cartItem = await CartItem.create(req.body)
        res.send(cartItem)
    } catch (error) {
        console.log('cartItem post route error: ', error)
        next(error)
    }
})

cartItemRouter.get('/:userId', async (req, res, next) => {
    try {
        const productsInCart = await CartItem.findAll({
            include: [{ model: Product }],
            attributes: [
                [fn('count', col('productId')), 'product_qty'],
                [fn('sum', col('product.price')), 'product_total']
            ],
            group: ['product.id'],
            where: { userId: req.params.userId },
        })
        res.send(productsInCart)
    } catch (error) {
        console.log('cartItem get all route error: ', error)
        next(error)
    }
})

cartItemRouter.delete('/:userId/:cartItemId', async (req, res, next) => {
    try {
        const cartItemToDelete = await CartItem.destroy({
            where: { id: req.params.cartItemId }
        })
        if (cartItemToDelete > 0) {
            res.status(204).send()
        } else {
            res.status(404).send('Cart item not deleted as it was not found.')
        }
    } catch (error) {
        console.log('cartItem delete single item route error: ', error)
        next(error)
    }
})

cartItemRouter.delete('/:userId', async (req, res, next) => {
    try {
        const cartToDelete = await CartItem.destroy({
            where: { userId: req.params.userId }
        })
        if (cartToDelete > 0) {
            res.status(204).send()
        } else {
            res.status(404).send('Not items were found in the cart so none were deleted.')
        }
    } catch (error) {
        console.log('cartItem delete all items route error: ', error)
        next(error)
    }
})


export default cartItemRouter