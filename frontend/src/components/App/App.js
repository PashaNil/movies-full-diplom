import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Main from "../Main/Main.js"
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import {
  getSaveMoviesApi, addMovieApi, deleteMovieApi, getUserInfoApi, updateProfileApi
} from "../../utils/MainApi";
import { registerApi, loginApi } from "../../utils/auth";
import { getMovies } from "../../utils/MoviesApi";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function App() {

  const navigate = useNavigate();
  const location = useLocation();

  // Активация preloader
  const [preloaderStatus, setPreloaderStatus] = React.useState(false);
  // Все фильмы от стороннего сервера
  const [allMovies, setAllMovies] = React.useState([]);
  // Сохраненные пользователем фильмы
  const [listSaveMovies, setListSaveMovies] = React.useState([]);
  // Код ошибки поиска фильмов
  const [errorCodeMovie, setErrorCodeMovie] = React.useState(null);
  // Код ошибки сервера в форме profile, login, register
  const [errorCodeForm, setErrorCodeForm] = React.useState(null);
  // Статус авторизации
  const [loggedIn, setLoggedIn] = React.useState(null);
  // Глобальные данные пользователя name и email
  const [currentUser, setCurrentUser] = React.useState({});

  // При монтировании проверка на наличие токена
  React.useEffect(() => {
    if (localStorage.token) {
      getUserInfo(localStorage.getItem("token"));
    } else {
      setLoggedIn(false)
    }
  }, [])

  // При авторизации -  запрос сохраненных фильмов и выгрузка всех фильмов
  React.useEffect(() => {
    if (loggedIn) {
      getSaveMovies();
      localStorage.movies && setAllMovies(JSON.parse(localStorage.getItem('movies')));
    }
  }, [loggedIn])

  // Cброс ошибок при переходе на другой компонент
  React.useEffect(() => {
    setErrorCodeMovie(null)
    setErrorCodeForm(null)
  }, [location])

  // Получени от стороннего сервера список всех фильмов
  function getAllMovies() {
    setPreloaderStatus(true)
    return getMovies()
      .then((movie) => {
        setErrorCodeMovie(null);
        setAllMovies(movie);
        localStorage.setItem('movies', JSON.stringify(movie));
      })
      .catch((err) => {
        setErrorCodeMovie(500)
        console.log(`Ошибка запроса: ${err.statusText} Код: ${err.status}`);
      })
      .finally(() => setPreloaderStatus(false))
  }

  // Получени от сервере сохраненных фильмов
  function getSaveMovies() {
    getSaveMoviesApi()
      .then((allSaveMovies) => {
        setErrorCodeMovie(null);
        setListSaveMovies(allSaveMovies);
      })
      .catch((err) => {
        setErrorCodeMovie(500)
        console.log(`Ошибка запроса: ${err.statusText} Код: ${err.status}`);
      })
  }

  // Отправка выбранный фильм на сервер
  function saveChosenMovie(movie) {
    addMovieApi(movie)
      .then((movie) => {
        setErrorCodeMovie(null);
        setListSaveMovies([...listSaveMovies, movie])
      })
      .catch((err) => {
        setErrorCodeMovie(500)
        console.log(`Ошибка запроса: ${err.statusText} Код: ${err.status}`);
      })
  }

  // Удаление выбранного фильма с сервера
  function deleteChosenMovie(id) {
    deleteMovieApi(id)
      .then((movie) => {
        setErrorCodeMovie(null);
        setListSaveMovies(listSaveMovies.filter(film => film.movieId !== movie.movieId))
      })
      .catch((err) => {
        setErrorCodeMovie(500)
        console.log(`Ошибка запроса: ${err.statusText} Код: ${err.status}`);
      })
  }

  // Регистрация
  function handleRegister({ name, email, password }) {
    setPreloaderStatus(true);
    registerApi(name, email, password)
      .then(() => {
        setErrorCodeForm(null);
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err.statusText} Код: ${err.status}`);
        setErrorCodeForm(err.status);
      })
      .finally(() => setPreloaderStatus(false))
  }

  // Авторизация
  function handleLogin({ email, password }) {
    setPreloaderStatus(true);
    loginApi(email, password)
      .then(({ token }) => {
        getUserInfo(token);
        localStorage.setItem("token", token);
        setLoggedIn(true);
        navigate("/movies")
        setErrorCodeForm(null);
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err.statusText} Код: ${err.status}`);
        setErrorCodeForm(err.status)
      })
      .finally(() => setPreloaderStatus(false));
  }

  // Получени информации о пользователе
  function getUserInfo(token) {
    if (token?.length > 0 && typeof token === "string") {
      setPreloaderStatus(true);
      getUserInfoApi(token)
        .then((userInfo) => {
          setErrorCodeForm(null);
          setLoggedIn(true);
          setCurrentUser({ "name": userInfo.name, "email": userInfo.email });
        })
        .catch((err) => {
          console.log(`Ошибка запроса: ${err.statusText} Код: ${err.status}`);
          setErrorCodeForm(404);
          setLoggedIn(false);
        })
        .finally(() => setPreloaderStatus(false));
    } else {
      setErrorCodeForm(400)
    }
  }

  // Обновление данных профиля
  function handleUpdateProfile({ name, email }) {
    setPreloaderStatus(true);
    updateProfileApi(name, email, localStorage.getItem("token"))
      .then((newUserInfo) => {
        setCurrentUser({ "name": newUserInfo.name, "email": newUserInfo.email });
        setErrorCodeForm(200);
      })
      .catch((err) => {
        setErrorCodeForm(err.status ? err.status : 444);
        console.log(`Ошибка запроса: ${err.statusText} Код: ${err.status}`);
      })
      .finally(() => setPreloaderStatus(false))
  }

  // Выход из профиля и очистка истории
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear()
    setCurrentUser({});
    setListSaveMovies([]);
    setAllMovies([]);
    setErrorCodeForm(null);
    setErrorCodeMovie(null);
    navigate("/");
  }

  // loading
  if (loggedIn === null) {
    return (
      <div className="page">
        <div className="page__container">
        </div>
      </div>
    )
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Preloader active={preloaderStatus} />
          <Routes>

            <Route path="/" element={<Main loggedIn={loggedIn} />} />

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  listSaveMovies={listSaveMovies}
                  saveChosenMovie={saveChosenMovie}
                  deleteChosenMovie={deleteChosenMovie}
                  allMovies={allMovies}
                  getAllMovies={getAllMovies}
                  setErrorCodeMovie={setErrorCodeMovie}
                  errorCodeMovie={errorCodeMovie}
                />
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  listSaveMovies={listSaveMovies}
                  loggedIn={loggedIn}
                  deleteChosenMovie={deleteChosenMovie}
                  setErrorCodeMovie={setErrorCodeMovie}
                  errorCodeMovie={errorCodeMovie}
                />}
            />

            <Route
              path="/signup"
              element={
                <ProtectedRoute
                  element={Register}
                  handleRegister={handleRegister}
                  errorCodeForm={errorCodeForm}
                  loggedIn={!loggedIn}
                  preloaderStatus={preloaderStatus}
                />}
            />

            <Route
              path="/signin"
              element={
                <ProtectedRoute
                  element={Login}
                  handleLogin={handleLogin}
                  errorCodeForm={errorCodeForm}
                  loggedIn={!loggedIn}
                  preloaderStatus={preloaderStatus}
                />}
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  errorCodeForm={errorCodeForm}
                  handleUpdateProfile={handleUpdateProfile}
                  handleLogOut={handleLogOut}
                  preloaderStatus={preloaderStatus}
                />
              }
            />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
