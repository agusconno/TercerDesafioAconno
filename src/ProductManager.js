import fs from 'fs';

export class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    product.id = newId;
    products.push(product);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(productId) {
    const products = this.getProducts();
    return products.find(product => product.id === productId);
  }

  updateProduct(productId, updatedProduct) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      updatedProduct.id = productId;
      products[productIndex] = updatedProduct;
      this.saveProducts(products);
    }
  }

  deleteProduct(productId) {
    const products = this.getProducts();
    const updatedProducts = products.filter(product => product.id !== productId);
    this.saveProducts(updatedProducts);
  }

  saveProducts(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }
}

