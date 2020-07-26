import { requestServer } from './AuthService'

export const getLastMessages = () =>
  requestServer('/messages', 'GET', true)
