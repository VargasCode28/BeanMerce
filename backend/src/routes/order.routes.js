import { Router } from 'express'
import { authRequired } from '../middlewares/auth.middleware.js'
import { createOrder } from '../controllers/order.controller.js'

const router = Router()

router.post('/checkout', authRequired, createOrder)

export default router
