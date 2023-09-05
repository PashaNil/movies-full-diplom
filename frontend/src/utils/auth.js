import { getResponseData } from "./getResponseData";
import {BASE_URL} from './constant';

const registerApi = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    })
  })
    .then((getResponseData))
}

const loginApi = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  })
    .then((getResponseData))
}

export {registerApi, loginApi}
