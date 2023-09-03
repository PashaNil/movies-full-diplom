import React from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router";
import { handlingErrorSearch } from "../../utils/HandlingErrorMsg";

function MoviesCardList({ children, errorCodeMovie, setNumberMoviesFound }) {

  const locationMovies = useLocation().pathname === "/movies";
  // Возможное количество фильмов на странице исходя из размера стр
  const [numberMoviesPage, setNumberMoviesPage] = React.useState(null)
  // состояние кнопки "еще"
  const [disablingMoreBtn, setDisablingMoreBtn] = React.useState(true);

  // Состояние кнопки "еще" при получении фильмов и изменении количества.
  React.useEffect(() => {
    numberMoviesPage <= children?.length ? setDisablingMoreBtn(false) : setDisablingMoreBtn(true);
  }, [children, numberMoviesPage])

  // Стартовая ширина страниы.
  React.useEffect(() => {
    countsMoviesFromWidth();
  }, [])

  // Отправляет кол-во отображаемых фильмов в родительский компонент
  React.useEffect(() => {
    setNumberMoviesFound(children.length);
  }, [children, setNumberMoviesFound])

  // Слушатель изменения размера страницы.
  React.useEffect(() => {
    const eventResize = () => setTimeout(countsMoviesFromWidth, 500);
    window.addEventListener('resize', eventResize);
    return () => window.removeEventListener('resize', eventResize);
  }, [])

  // Функция считающая количество карточек в зависимости от принятой ширины.
  function countsMoviesFromWidth() {
    const widthPage = window.innerWidth;
    if (widthPage > 1100) {
      setNumberMoviesPage(16);
      return 16;
    } else if (widthPage > 730) {
      setNumberMoviesPage(8);
      return 8;
    } else {
      setNumberMoviesPage(5);
      return 5;
    }
  }

  // Слушатель кнопки "еще". Добавляет еще столько же фильмов на страницу.
  function handleMoreMovies() {
    if (numberMoviesPage <= children.length) {
      setNumberMoviesPage(numberMoviesPage + countsMoviesFromWidth(window.innerWidth));
    }
  }

  // Функция отрисовывающая фильмы на страницу по значению стейта количества фильмов.
  function renderMoviesByScreenSize(movies) {
    return movies.map((films, index) => (index + 1) <= numberMoviesPage ? films : null);
  }

  return (
    <>
      <section className="moviesCardList">
        <p className="moviesCardList__message">
          {errorCodeMovie ? handlingErrorSearch(errorCodeMovie) : ""}
        </p>
        <div className="moviesCardList__grid-container">
          {!locationMovies ? children : renderMoviesByScreenSize(children)}
        </div>
        {locationMovies &&
          <button
            className={`moviesCardList__more-btn ${disablingMoreBtn && "moviesCardList__more-btn_disabling"}`}
            type="button"
            onClick={handleMoreMovies} >
            Ещё
          </button>
        }
      </section>
    </>
  )
}

export default MoviesCardList;
