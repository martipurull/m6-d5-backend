import Product from './product_model.js'
import Review from './review_model.js'
import Category from './category_model.js'
import User from './user_model.js'
import ProductCategory from './productCategory.js'

Product.hasMany(Review, { onDelete: 'CASCADE' })
Review.belongsTo(Product)

Product.belongsToMany(Category, { through: ProductCategory, onDelete: 'CASCADE' })
Category.belongsToMany(Product, { through: ProductCategory, onDelete: 'CASCADE' })

User.hasMany(Review, { onDelete: 'CASCADE' })
Review.belongsTo(User)

export { Product, Review, Category, User, ProductCategory }