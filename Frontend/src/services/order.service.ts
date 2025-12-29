import privateApi from './private.api'

export const checkoutRequest = (data: any) =>
  privateApi.post('/orders/checkout', data)
