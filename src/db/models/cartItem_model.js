import sequelize from '../connect.js'
import seq, { UUIDV4 } from 'sequelize'

const { DataTypes } = seq

const CartItem = sequelize.define(
    'cartItem',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4
        }
    }
)




export default CartItem