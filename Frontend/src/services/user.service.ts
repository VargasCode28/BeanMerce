import privateApi from './private.api'



export const deleteAccountRequest = () => {
  return privateApi.delete('/user/me')
}




