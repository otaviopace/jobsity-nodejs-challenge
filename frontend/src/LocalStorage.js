export const storeId = id =>
  localStorage.setItem('id', id)

export const storeUsername = username =>
  localStorage.setItem('username', username)

export const storeSession = sessionToken =>
  localStorage.setItem('session-token', sessionToken)

export const getLocalId = () =>
  localStorage.getItem('id')

export const getLocalUsername = () =>
  localStorage.getItem('username')

export const getLocalSessionToken = () =>
  localStorage.getItem('session-token')

export const logout = () => {
  localStorage.removeItem('session-token')
  localStorage.removeItem('username')
  localStorage.removeItem('id')
}
