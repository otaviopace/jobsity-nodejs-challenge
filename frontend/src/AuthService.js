export const storeUsername = body =>
  localStorage.setItem('username', body.username)

export const storeSession = body =>
  localStorage.setItem('session-token', body.token)

export const getLocalUsername = () =>
  localStorage.getItem('usename')

export const getLocalSessionToken = () =>
  localStorage.getItem('session-token')

export const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('session-token')
}

const BASE_URL = 'http://localhost:4000' // should change on deploy env

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
    .then(storeUsername)

export const createSession = body =>
  requestServer('/sessions', 'POST', body)
    .then(storeSession)
