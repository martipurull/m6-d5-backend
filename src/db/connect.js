import { Sequelize } from "sequelize"

const { DB_URL } = process.env

const sequelize = new Sequelize(DB_URL)

export const testDbConnection = async () => {
    try {
        await sequelize.authenticate({ logging: false })
        console.log("DB authenticated!")
    } catch (error) {
        console.log("Failed to authenticate due to error: ", error)
    }
}

export default sequelize