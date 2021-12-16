import sequelize from '../connect.js'
import seq from 'sequelize'

const { DataTypes } = seq

const ProductCategory = sequelize.define(
    'productCategory',
    {

    },
    {
        timestamps: false
    }
)





export default ProductCategory