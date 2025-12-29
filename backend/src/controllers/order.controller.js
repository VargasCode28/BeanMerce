import Order from '../models/Order.model.js'

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
      order
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear orden' })
  }
}
