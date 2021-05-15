import { API_URL } from '../config/config'
import cookie from 'react-cookies'
export async function fetchAPI(options){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + cookie.load('accessToken'));
  options.method == 'POST' && myHeaders.append("Content-Type", "application/json");
  return fetch(API_URL + options.url, {
    method: options.method,
    headers: myHeaders,
    body: options.body ? JSON.stringify(options.body) : undefined,
    redirect: 'follow',
  })
    .then(response => response.json())
}