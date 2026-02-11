const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/shoesdb';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'mysql',
  logging: false,
});

// Models
const Product = sequelize.define('Product', {
  modelName: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  rating: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.ENUM('active', 'archived'), defaultValue: 'active' },
}, { underscored: true });

const ProductImage = sequelize.define('ProductImage', {
  url: { type: DataTypes.STRING, allowNull: false },
  altText: { type: DataTypes.STRING },
  order: { type: DataTypes.INTEGER },
}, { underscored: true });

const Review = sequelize.define('Review', {
  rating: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING },
  body: { type: DataTypes.TEXT },
  author: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
}, { underscored: true });

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
}, { underscored: true });

const Cart = sequelize.define('Cart', {
  sessionId: { type: DataTypes.STRING },
  subtotal: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
}, { underscored: true });

const CartItem = sequelize.define('CartItem', {
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  unitPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  lineTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { underscored: true });

const ContactRequest = sequelize.define('ContactRequest', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('new', 'reviewed', 'archived'), defaultValue: 'new' },
}, { underscored: true });

// Associations
Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

CartItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

async function init({ sync = false } = {}) {
  await sequelize.authenticate();
  if (sync) {
    await sequelize.sync();
  }
}

module.exports = {
  sequelize,
  Sequelize,
  init,
  Product,
  ProductImage,
  Review,
  User,
  Cart,
  CartItem,
  ContactRequest,
};
