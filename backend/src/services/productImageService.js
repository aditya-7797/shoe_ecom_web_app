const { ProductImage } = require('../models');

async function addImage(productId, { url, altText = '', order = 1 }) {
  const img = await ProductImage.create({ product_id: productId, url, altText, order });
  return img;
}

async function deleteImage(imageId) {
  const n = await ProductImage.destroy({ where: { id: imageId } });
  return n > 0;
}

async function deleteImagesForProduct(productId) {
  await ProductImage.destroy({ where: { product_id: productId } });
}

module.exports = { addImage, deleteImage, deleteImagesForProduct };
