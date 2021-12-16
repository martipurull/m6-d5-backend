import sequelize from '../connect.js'
import seq from 'sequelize'

const { DataTypes } = seq

const Category = sequelize.define(
    'category',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
)





export default Category