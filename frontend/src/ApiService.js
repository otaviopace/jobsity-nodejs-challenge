import jwtDecode from 'jwt-decode'
import { storeId, storeUsername, storeSession, getLocalSessionToken } from './LocalStorage'

export const decodeAndStoreSession = body => {
  storeSession(body.token)

  const { id, username } = jwtDecode(body.token)

  storeId(id)
  storeUsername(username)
}

export const HTTP_URL = 'http://localhost:4000' // should change on deploy env
export const WEB_SOCKET_URL = 'http://localhost:5000' // should change on deploy env

export const buildUrl = route => `${HTTP_URL}${route}`

export const handleErrors = async response => {
  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.errors[0].message)
  }

  return body
}

const buildAuthorizationToken = () =>
  `Bearer ${getLocalSessionToken()}`

export const requestServer = (route, method, withAuthentication = false, body = null) =>
  fetch(buildUrl(route), {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: withAuthentication ? buildAuthorizationToken() : null
    },
    body: body ? JSON.stringify(body) : null
  })
    .then(handleErrors)

export const registerUser = body =>
  requestServer('/users', 'POST', false, body)

export const createSession = body =>
  requestServer('/sessions', 'POST', false, body)
    .then(decodeAndStoreSession)

export const getLastMessages = () =>
  requestServer('/messages', 'GET', true)
