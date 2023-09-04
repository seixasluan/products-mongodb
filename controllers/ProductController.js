const Product = require('../models/Product');

module.exports = class ProductController {
  
  static async showProducts(req, res) {
    const products = await Product.getProducts();
    res.render('products/all', { products });
  }

  static createProduct(req, res) {
    res.render('products/create');
  }

  static createProductPost(req, res) {
    const { name, image, price, description } = req.body;

    const product = new Product(name, image, price, description);

    product.save();

    res.redirect('/products');
  }

  static async getProduct(req, res) {
    const id = req.params.id;

    const product = await Product.getProductById(id);
    console.log(product);

    res.render('products/product', { product });
  }

  static async removeProduct(req, res) {
    const id = req.params.id;
    await Product.removeProductById(id);
    console.log('Excluído!');
    res.redirect('/products');
  }

  static async editProduct(req, res) {
    const id = req.params.id;
    // alteração
    const product = await Product.getProductById(id);
    
    res.render('products/edit', { product });
  }

  static async editProductPost(req, res) {
    const { id, name, image, price, description } = req.body;

    const product = new Product(name, image, price, description)
      await product.updateProduct(id);
      res.redirect('/products');
  }
}