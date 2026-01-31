import User from '../models/User.model.js'
import Order from '../models/Order.model.js'
import bcrypt from 'bcryptjs'


export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id


    // 1️ borrar órdenes del usuario
    await Order.deleteMany({ user: userId })

    // 2️ borrar usuario
    await User.findByIdAndDelete(userId)

    res.json({ message: 'Cuenta eliminada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar la cuenta' })
  }
}





// NEW change password




export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id
    const { password } = req.body

    if (!password) {
      return res.status(400).json({ message: 'La contraseña es obligatoria' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword
    })

    res.json({ message: 'Contraseña actualizada correctamente' })

  } catch (error) {
    res.status(500).json({ message: 'Error al cambiar la contraseña' })
  }
}
