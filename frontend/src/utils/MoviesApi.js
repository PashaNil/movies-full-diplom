import { getResponseData } from "./getResponseData";

const baseUrl = "https://api.nomoreparties.co/beatfilm-movies"

export const getMovies = () => {
  return fetch(baseUrl, {
    method: "GET"
  })
    .then(getResponseData);
}
