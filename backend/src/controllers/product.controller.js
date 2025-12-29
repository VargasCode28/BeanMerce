import Product from '../models/Product.model.js'

export const seedProducts = async (req, res) => {
  await Product.deleteMany()

  const products = await Product.insertMany([
    { name: 'Cafe Premium', price: 10 },
    { name: 'Cafe Espresso', price: 8 }
  ])

  res.json(products)
}


// GET PRODUCTS ✅ (ESTO FALTABA)
export const getProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}
