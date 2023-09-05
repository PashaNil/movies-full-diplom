import {MOVIES_URL} from "./constant";
import { getResponseData } from "./getResponseData";

export const getMovies = () => {
  return fetch(MOVIES_URL, {
    method: "GET"
  })
    .then(getResponseData);
}
