import React from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router";
import { handlingErrorSearch } from "../../utils/HandlingErrorMsg";
import {
  SCREEN_WIDTH_1280,
  SCREEN_WIDTH_1100,
  SCREEN_WIDTH_639,
  NUMBER_MOVIES_PAGE_16,
  NUMBER_MOVIES_PAGE_12,
  NUMBER_MOVIES_PAGE_8,
  NUMBER_MOVIES_PAGE_5,
  NUMBER_ADDITIONAL_MOVIES_4,
  NUMBER_ADDITIONAL_MOVIES_3,
  NUMBER_ADDITIONAL_MOVIES_2
} from "../../utils/constant";

function MoviesCardList({ children, errorCodeMovie, setNumberMoviesFound }) {

  const locationMovies = useLocation().pathname === "/movies";
  // Возможное количество фильмов на странице исходя из размера стр
  const [numberMoviesPage, setNumberMoviesPage] = React.useState(null)
  // состояние кнопки "еще"
  const [disablingMoreBtn, setDisablingMoreBtn] = React.useState(true);

  // Состояние кнопки "еще" при получении фильмов и изменении количества.
  React.useEffect(() => {
    children?.length > numberMoviesPage ? setDisablingMoreBtn(false) : setDisablingMoreBtn(true);
  }, [children, numberMoviesPage])

  // Стартовая ширина страниы c количество карточек и кнопкой еще
  React.useEffect(() => {
    countsMoviesFromWidth();
  }, [children])

  // Отправляет кол-во отображаемых фильмов в родительский компонент
  React.useEffect(() => {
    setNumberMoviesFound(children?.length);
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
    if (widthPage >= SCREEN_WIDTH_1280) {
      setNumberMoviesPage(NUMBER_MOVIES_PAGE_16);
      return NUMBER_ADDITIONAL_MOVIES_4;
    } else if (widthPage > SCREEN_WIDTH_1100) {
      setNumberMoviesPage(NUMBER_MOVIES_PAGE_12);
      return NUMBER_ADDITIONAL_MOVIES_3;
    } else if (widthPage > SCREEN_WIDTH_639) {
      setNumberMoviesPage(NUMBER_MOVIES_PAGE_8);
      return NUMBER_ADDITIONAL_MOVIES_2;
    } else {
      setNumberMoviesPage(NUMBER_MOVIES_PAGE_5);
      return NUMBER_ADDITIONAL_MOVIES_2;
    }
  }

  // Слушатель кнопки "еще". Добавляет еще столько же фильмов на страницу.
  function handleMoreMovies() {
    if (children?.length >= numberMoviesPage) {
      setNumberMoviesPage((number) => number + countsMoviesFromWidth(window.innerWidth));
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
