import User from '../models/User.model.js'
import Order from '../models/Order.model.js'

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id

    // 1️⃣ borrar órdenes del usuario
    await Order.deleteMany({ user: userId })

    // 2️⃣ borrar usuario
    await User.findByIdAndDelete(userId)

    res.json({ message: 'Cuenta eliminada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar la cuenta' })
  }
}
