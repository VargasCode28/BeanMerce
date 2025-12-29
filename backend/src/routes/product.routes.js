import { Router } from 'express'
import { seedProducts, getProducts } from '../controllers/product.controller.js'

const router = Router()

router.post('/seed', seedProducts)
router.get('/', getProducts)

export default router
