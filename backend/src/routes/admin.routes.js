import { Router } from 'express'
import { authRequired } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/role.middleware.js'
import upload from '../middlewares/upload.middleware.js'
import {
  getAllUsers,
  getAllOrders,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct

} from '../controllers/admin.controller.js'

const router = Router()

router.use(authRequired, isAdmin)

router.get('/users', getAllUsers)
router.get('/orders', getAllOrders)
router.get('/products', getAllProducts)

router.post(
  '/products', 
   upload.single('image'),
  
  createProduct
)



router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)





export default router
