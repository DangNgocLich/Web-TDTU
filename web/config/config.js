export const dev = process.env.NODE_ENV !== 'production'
export const URL_DEV = 'http://localhost:5000/'
export const URL_PRODUCTION = 'https://immense-bastion-75226.herokuapp.com/'
export const URL = (dev ? URL_DEV : URL_PRODUCTION)
export const API_URL = URL + 'api/'