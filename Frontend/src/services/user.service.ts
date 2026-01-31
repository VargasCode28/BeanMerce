import privateApi from './private.api'








export const changePasswordRequest = (password: string) => {
  return privateApi.put('/user/me/password', {password})
}



export const deleteAccountRequest = () => {
  return privateApi.delete('/user/me')
}




