import Product from './product_model.js'
import Review from './review_model.js'

Product.hasMany(Review, { onDelete: "CASCADE" })
Review.belongsTo(Product)

export { Product, Review }