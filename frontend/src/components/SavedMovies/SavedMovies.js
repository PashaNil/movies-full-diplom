import React from "react";

import "./SavedMovies.css";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import MoviesCard from "../MoviesCard/MoviesCard";
import Footer from "../Footer/Footer.js";

import { filteringCombinedMovies } from "../../utils/FilteringMovies.js";

function SavedMovies(
  {
    listSaveMovies,
    loggedIn,
    deleteChosenMovie,
    setErrorCodeMovie,
    errorCodeMovie
  }
) {

  // Cостояние чекбокса
  const [checkBoxStatus, setCheckBoxStatus] = React.useState(false);
  // Состояние инпута
  const [inputSearch, setInputSearch] = React.useState("");
  // Количество найденных фильмов
  const [numberMoviesFound, setNumberMoviesFound] = React.useState(0);

  // Отображение ошибки найденных фильмов
  React.useEffect(() => {
    if (listSaveMovies?.length > 0) {
      numberMoviesFound > 0 ? setErrorCodeMovie(null) : setErrorCodeMovie(404);
    }
  }, [numberMoviesFound, listSaveMovies, setErrorCodeMovie])

  // Функция изменения состояния чек бокса и обновления фильтра фильмов.
  const handleCheckBox = () => setCheckBoxStatus(!checkBoxStatus);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="savedMovies">
        <div className="savedMovies__movies-container">
          <SearchForm
            submit={setInputSearch}
            setErrorCodeMovie={setErrorCodeMovie}
            checkBoxStatus={checkBoxStatus}
            handleCheckBox={handleCheckBox}
          />
          <MoviesCardList
            errorCodeMovie={errorCodeMovie}
            setNumberMoviesFound={setNumberMoviesFound}
          >
            {listSaveMovies &&
              filteringCombinedMovies(listSaveMovies, inputSearch, checkBoxStatus).map((movie) => (
                <MoviesCard
                  key={movie.movieId}
                  movieData={movie}
                  deleteChosenMovie={deleteChosenMovie}
                />
              ))}
          </MoviesCardList>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;
