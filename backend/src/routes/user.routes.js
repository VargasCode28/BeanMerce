import { Router } from 'express'
import { authRequired } from '../middlewares/auth.middleware.js'
import { createOrder} from '../controllers/order.controller.js'
import { deleteAccount} from '../controllers/user.controller.js' //NEW

const router = Router()



router.post('/orders', authRequired , createOrder)


router.get('/shop', authRequired, (req, res) => {
  res.json({
    message: 'Bienvenido usuario',
    user: req.user
  })
})



router.delete('/me', authRequired, deleteAccount) //NEW

export default router
