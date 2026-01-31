
import privateApi from './private.api'

export const getUsersAdmin = () => {
  return privateApi.get('/admin/users')
}

export const getOrdersAdmin = () => {
  return privateApi.get('/admin/orders')
}

export const getProductsAdmin = () => {
  return privateApi.get('/admin/products')
}


// ✅ NO headers aquí
export const createProductAdmin = (data: FormData) =>
  privateApi.post('/admin/products', data)

export const updateProductAdmin = (id: string, data: any) =>
  privateApi.put(`/admin/products/${id}`, data)

export const deleteProductAdmin = (id: string) =>
  privateApi.delete(`/admin/products/${id}`)
