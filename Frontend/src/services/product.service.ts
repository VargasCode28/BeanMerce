import privateApi from './private.api'




export const getProductsRequest = () => {
  return privateApi.get('/products')
}
