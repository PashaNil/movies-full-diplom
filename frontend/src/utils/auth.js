import { getResponseData } from "./getResponseData";

const baseUrl = "http://localhost:3000"

const registerApi = (name, email, password) => {
  return fetch(`${baseUrl}/signup`, {
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
  return fetch(`${baseUrl}/signin`, {
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
