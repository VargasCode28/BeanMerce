import Order from '../models/Order.model.js'

import User from '../models/User.model.js'
import  {generateInvoice} from '../utils/generateInvoice.js'






export const getInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product')
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' })
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' })
    }

    const user = await User.findById(req.user.id)

    generateInvoice(order, user, res)
  } catch (error) {
    res.status(500).json({ message: 'Error al generar boleta' })
  }
}

























export const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Carrito vacío' })
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const order = new Order({
      user: req.user.id,
      items,
      total,
      paymentMethod
    })

    await order.save()

    res.status(201).json({
      message: 'Compra realizada con éxito',
      // order
      orderId: order._id

    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear orden' })
  }
}
