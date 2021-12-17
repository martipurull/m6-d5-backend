import express from 'express'
import { Op } from 'sequelize'
import { User } from '../db/models/index.js'

const userRouter = express.Router()

userRouter.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.send(user)
    } catch (error) {
        console.log("User post route error: ", error)
        next(error)
    }
})

userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll(
            {
                where: {
                    ...(req.query.search && {
                        [Op.or]: [
                            { name: { [Op.iLike]: `%${ req.query.search }%` }, },
                            { lastName: { [Op.iLike]: `%${ req.query.search }%` } },
                            { email: { [Op.iLike]: `%${ req.query.search }%` } }
                        ]
                    }),
                    ...(req.query.search && {
                        age: {
                            [Op.between]: req.query.age.split(",")
                        }
                    }),
                },
                order: [["lastName", "DESC"]]
            }
        )
        res.send(users)
    } catch (error) {
        console.log("User get all route error: ", error)
        next(error)
    }
})

userRouter.get('/:userId', async (req, res, send) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if (user) {
            res.send(user)
        } else {
            res.status(404).send(`User with id ${ req.params.userId } not found.`)
        }
    } catch (error) {
        console.log("User get one route error: ", error)
        next(error)
    }
})

userRouter.put('/:userId', async (req, res, next) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: { id: req.params.userId },
            returning: true
        })
        res.send(updatedUser)
    } catch (error) {
        console.log("User put one route error: ", error)
        next(error)
    }
})

userRouter.delete('/:userId', async (req, res, next) => {
    try {
        const userToDelete = await User.destroy({ where: { id: req.params.userId } })
        console.log(userToDelete)
        if (userToDelete > 0) {
            res.status(204).send()
        } else {
            res.status(404).send(`User with id ${ req.params.userId } couldn't be deleted since it wasn't found.`)
        }
    } catch (error) {
        console.log("User delete one route error: ", error)
        next(error)
    }
})



export default userRouter