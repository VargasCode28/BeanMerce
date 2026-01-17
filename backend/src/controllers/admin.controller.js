import Product from '../models/Product.model.js'
import User from '../models/User.model.js'
import Order from '../models/Order.model.js'
import mongoose from 'mongoose'



//  PRODUCTOS
export const getAllProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}






export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body

    if (!name || !price) {
      return res.status(400).json({ message: 'Datos incompletos' })
    }

    const product = new Product({
      name,
      price,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    })

    await product.save()
    res.status(201).json(product)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear producto' })
  }
}










export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(product)
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' })
  }
}

// USUARIOS
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
}

//  ÓRDENES
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'email role')
    .populate('items.product', 'name price')
  res.json(orders)
}
