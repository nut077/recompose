import Cookies from 'js-cookie'

function getTokenFromHeaders(headers) {
  return headers.get('Authorization');
}

function getToken() {
  return Cookies.get('access-token');
}

function setToken(headers) {
  const token = getTokenFromHeaders(headers);
  if (token !== null) {
    Cookies.set('access-token', token);
  }
}

function removeToken() {
  Cookies.remove('access-token');
}

export default {
  setToken,
  getToken,
  removeToken
}