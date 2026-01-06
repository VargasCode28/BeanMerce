// import { Router } from 'express'
// import { authRequired } from '../middlewares/auth.middleware.js'
// import { createOrder } from '../controllers/order.controller.js'

// const router = Router()

// router.post('/checkout', authRequired, createOrder)




// router.get('/orders/:id/pdf', authRequired, async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id)
//         .populate('items.product')

//         if (!order) {
//             return res.status(404).json({ message: 'Orden no encontrada'})
//         }

//         if (order.user.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'No autorizado'})
//         }

//         const user = await User.findById(req.user.id)


//         generateInvoice(order, user, res)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: 'Error al generar La boleta'})
//     }
// })






// export default router










































































import { Router } from 'express'
import { authRequired } from '../middlewares/auth.middleware.js'
import { createOrder } from '../controllers/order.controller.js'
import Order from '../models/Order.model.js'
import User from '../models/User.model.js'
import { generateInvoice } from '../utils/generateInvoice.js'

const router = Router()

// Checkout
router.post('/checkout', authRequired, createOrder)

// PDF de la orden
router.get('/:id/pdf', authRequired, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' })
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' })
    }

    const user = await User.findById(req.user.id)

    generateInvoice(order, user, res)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al generar la boleta' })
  }
})

export default router


