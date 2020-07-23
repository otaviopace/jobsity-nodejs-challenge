import jwtDecode from 'jwt-decode'

export const storeId = id =>
  localStorage.setItem('id', id)

export const storeUsername = username =>
  localStorage.setItem('username', username)

export const storeSession = sessionToken =>
  localStorage.setItem('session-token', sessionToken)

export const decodeAndStoreSession = body => {
  storeSession(body.token)

  const { id, username } = jwtDecode(body.token)

  storeId(id)
  storeUsername(username)
}

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

export const BASE_URL = 'http://localhost:4000' // should change on deploy env

export const buildUrl = route => `${BASE_URL}${route}`

export const handleErrors = async response => {
  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.errors[0].message)
  }

  return body
}

export const requestServer = (route, method, body = {}) =>
  fetch(buildUrl(route), {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(handleErrors)

export const registerUser = body =>
  requestServer('/users', 'POST', body)

export const createSession = body =>
  requestServer('/sessions', 'POST', body)
    .then(decodeAndStoreSession)
