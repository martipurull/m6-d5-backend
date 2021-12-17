import Product from './product_model.js'
import Review from './review_model.js'
import Category from './category_model.js'
import User from './user_model.js'
import ProductCategory from './productCategory.js'
import CartItem from './cartItem_model.js'

Product.hasMany(Review, { onDelete: 'CASCADE' })
Review.belongsTo(Product)

Product.hasMany(CartItem, { onDelete: 'CASCADE' })
CartItem.belongsTo(Product)

User.hasMany(Review, { onDelete: 'CASCADE' })
Review.belongsTo(User)

User.hasMany(CartItem, { onDelete: 'CASCADE' })
CartItem.belongsTo(User)

Product.belongsToMany(Category, { through: ProductCategory, onDelete: 'CASCADE' })
Category.belongsToMany(Product, { through: ProductCategory, onDelete: 'CASCADE' })



export { Product, Review, Category, User, ProductCategory, CartItem }