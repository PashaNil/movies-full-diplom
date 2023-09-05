// Универсальная функция фильтрации фильмов
export function filteringCombinedMovies(moviesArr, nameFilm, checkBoxStatus) {
  if (checkBoxStatus) {
    return filteringMoviesByName(filteringShortMovies(moviesArr), nameFilm)
  } else {
    return filteringMoviesByName(moviesArr, nameFilm)
  }
}

// Фильтр краткометражек
function filteringShortMovies(moviesArr) {
  return moviesArr.filter((film) => {
    return film.duration <= 40;
  })
}

// Фильтр по названию
function filteringMoviesByName(moviesArr, nameFilm) {
  return moviesArr.filter((film) => {
    return (
      film.nameEN.toLowerCase().includes(nameFilm.toLowerCase())
      ||
      film.nameRU.toLowerCase().includes(nameFilm.toLowerCase())
    );
  });
};
