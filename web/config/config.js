export const dev = process.env.NODE_ENV !== 'production'
export const URL_DEV = 'http://localhost:5000/'
export const URL_PRODUCTION = 'http://61.28.229.242/tda/'
export const URL = (dev ? URL_DEV : URL_PRODUCTION)
export const API_URL = URL + 'api/'