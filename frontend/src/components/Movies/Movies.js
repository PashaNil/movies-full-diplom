import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Footer from "../Footer/Footer.js";
import { filteringCombinedMovies } from "../../utils/FilteringMovies.js";

function Movies(
  {
    loggedIn,
    listSaveMovies,
    saveChosenMovie,
    deleteChosenMovie,
    allMovies,
    getAllMovies,
    setErrorCodeMovie,
    errorCodeMovie
  }
) {

  // Cостояние инпута
  const [valueSearch, setValueSearch] = React.useState("");
  // Cостояние чекбокса
  const [checkBoxStatus, setCheckBoxStatus] = React.useState(false);
  // Количество найденных фильмов
  const [numberMoviesFound, setNumberMoviesFound] = React.useState(null);

  // Востановление параметров поиска при повторном заходе
  React.useEffect(() => {
    if (localStorage.checkBox && localStorage.search) {
      setCheckBoxStatus(JSON.parse(localStorage.getItem('checkBox')));
      setValueSearch(JSON.parse(localStorage.getItem('search')));
    }
  }, []);

  // Отображение ошибки найденных фильмов
  React.useEffect(() => {
    if(allMovies?.length > 0){
    numberMoviesFound > 0 ? setErrorCodeMovie(null) : setErrorCodeMovie(404);
    }
  }, [allMovies, numberMoviesFound, setErrorCodeMovie])

  // Функция изменения состояния чек-бокса.
  const handleCheckBox = () => setCheckBoxStatus(!checkBoxStatus);

  // Поиск фильма
  function handlerSearch(inputValue) {
    const localMovie = localStorage.getItem('movies') && JSON.parse(localStorage.getItem('movies'));
    if (localMovie?.length > 0) {
      setValueSearch(inputValue);
      saveHistoryLocal(checkBoxStatus, inputValue)
    } else {
      setValueSearch(inputValue);
      getAllMovies()
      saveHistoryLocal(checkBoxStatus, inputValue)
    }
  }

  // Сохранение данных в локальном хранилище
  function saveHistoryLocal(checkBoxStatus, inputValue) {
    localStorage.setItem('checkBox', JSON.stringify(checkBoxStatus));
    localStorage.setItem('search', JSON.stringify(inputValue));
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm
          submit={handlerSearch}
          setErrorCodeMovie={setErrorCodeMovie}
          checkBoxStatus={checkBoxStatus}
          handleCheckBox={handleCheckBox}
        />
        <MoviesCardList
          errorCodeMovie={errorCodeMovie}
          setNumberMoviesFound={setNumberMoviesFound}
        >
          {allMovies &&
            filteringCombinedMovies(allMovies, valueSearch, checkBoxStatus).map((movie) => (
              <MoviesCard
                key={movie.id}
                movieData={movie}
                listSaveMovies={listSaveMovies}
                saveChosenMovie={saveChosenMovie}
                deleteChosenMovie={deleteChosenMovie}
              />
            ))}
        </MoviesCardList>
      </main>
      <Footer />
    </>
  )
}

export default Movies;
