import express from 'express'
import { Op } from 'sequelize'
import { Product, Review, User, Category, ProductCategory } from '../db/models/index.js'


const productRouter = express.Router()

productRouter.post('/', async (req, res, next) => {
    try {
        const { categoryId, ...rest } = req.body
        const product = await Product.create(rest)
        if (product) {
            const dataToPass = categoryId.map(id => ({
                categoryId: id,
                productId: product.id
            }))
            const productCategoryData = await ProductCategory.bulkCreate(dataToPass)
            res.send({ product, productCategory: productCategoryData })
        }
    } catch (error) {
        console.log("Product post route error: ", error)
        next(error)
    }
})

productRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll(
            {
                include: [
                    {
                        model: Category,
                        through: { attributes: [] },
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        where: {
                            ...(req.query.category && {
                                name: { [Op.in]: req.category.name.split(",") }
                            })
                        }
                    },
                    {
                        model: Review, include: User
                    }
                ],
                where: {
                    ...(req.query.search && {
                        [Op.or]: [
                            { name: { [Op.iLike]: `%${ req.query.search }%` }, },
                            { description: { [Op.iLike]: `%${ req.query.search }%` } }
                        ]
                    }),
                    ...(req.query.search && {
                        price: {
                            [Op.between]: req.query.price.split(",")
                        }
                    }),
                },
                order: [["price", "DESC"], ["name", "DESC"]],
                limit: req.query.limit,
                offset: req.query.limit && req.query.page && parseInt(req.query.limit * (req.query.page - 1))
            }
        )
        res.send(products)
    } catch (error) {
        console.log("Product get all route error: ", error)
        next(error)
    }
})

productRouter.get('/:productId', async (req, res, send) => {
    try {
        const product = await Product.findByPk(req.params.productId)
        if (product) {
            res.send(product)
        } else {
            res.status(404).send(`Product with id ${ req.params.productId } not found.`)
        }
    } catch (error) {
        console.log("Product get one route error: ", error)
        next(error)
    }
})

productRouter.put('/:productId', async (req, res, next) => {
    try {
        const updatedProduct = await Product.update(req.body, {
            where: { id: req.params.productId },
            returning: true
        })
        res.send(updatedProduct)
    } catch (error) {
        console.log("Product put one route error: ", error)
        next(error)
    }
})

productRouter.delete('/:productId', async (req, res, next) => {
    try {
        const result = await Product.destroy({
            where: { id: req.params.productId }
        })
        if (result > 0) {
            res.status(204).send()
        } else {
            res.status(404).send(`Product with id ${ req.params.productId } couldn't be deleted since it wasn't found.`)
        }
    } catch (error) {
        console.log("Product delete one route error: ", error)
        next(error)
    }
})

export default productRouter