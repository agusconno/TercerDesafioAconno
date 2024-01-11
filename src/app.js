import express from 'express';
import { ProductManager } from './ProductManager.js'; 

const app = express();
const port = 3000; 

const productManager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit; //  el parámetro de límite desde la consulta
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit, 10));
      return res.json({ products: limitedProducts });
    } else {
      return res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    if (!isNaN(productId)) {
      const product = await productManager.getProductById(productId);
      if (product) {
        return res.json({ product });
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    } else {
      res.status(400).json({ error: 'ID de producto no válido.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
