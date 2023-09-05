import {BASE_URL} from './constant';
import { getResponseData } from "./getResponseData";

// Cохраненные фильмы
const getSaveMoviesApi = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem("token")
    }
  })
    .then((getResponseData))
}

// Отправка фильма
const addMovieApi = (movieData) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify({
      country: movieData.country,
      director: movieData.director,
      duration: movieData.duration,
      year: movieData.year,
      description: movieData.description,
      image: "https://api.nomoreparties.co" + movieData.image.url,
      trailerLink: movieData.trailerLink,
      thumbnail: "https://api.nomoreparties.co" + movieData.image.formats.thumbnail.url,
      movieId: movieData.id,
      nameRU: movieData.nameRU,
      nameEN: movieData.nameEN,
    })
  })
    .then((getResponseData))
}

// Удаление фильма
const deleteMovieApi = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem("token")
    }
  })
    .then((getResponseData))
}

// Получение информации о пользователе
const getUserInfoApi = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    },
  })
    .then((getResponseData))
}

// Обновление данных пользователя
const updateProfileApi = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    },
    body: JSON.stringify({
      "email": email,
      "name": name
    })
  })
    .then((getResponseData))
}

export { getSaveMoviesApi, addMovieApi, deleteMovieApi, getUserInfoApi, updateProfileApi }
