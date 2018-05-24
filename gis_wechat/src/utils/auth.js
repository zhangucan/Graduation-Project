import Cookies from 'js-cookie'
import NodeRSA from 'node-rsa'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function encrypt(key, text) {
  const public_key = new NodeRSA(key)
  public_key.setOptions({ encryptionScheme: 'pkcs1' })
  return public_key.encrypt(text, 'base64')
}
