import React from "react";
import "./MoviesCard.css";
import crossImg from "../../images/crossMenu.svg";
import { useLocation } from "react-router";

function MoviesCard({ movieData, listSaveMovies, saveChosenMovie, deleteChosenMovie }) {
  const location = useLocation().pathname === "/movies";

  // Состояние лайка(choice)
  const [choiceMovie, setChoiceMovie] = React.useState(false);

  // Состояние лайка(choice) из локального хранилища для /movie
  React.useEffect(() => {
    if (listSaveMovies?.length > 0) {
      listSaveMovies.some((movie) => movie.movieId === movieData.id) ? setChoiceMovie(true) : setChoiceMovie(false)
    } else {
      setChoiceMovie(false)
    }
  }, [movieData, listSaveMovies])

  // Управление состоянием лайка(choice) при нажатии
  function handleChoice() {
    if (!choiceMovie) {
      saveChosenMovie(movieData);
    } else {
      listSaveMovies.find((film) => (
        film.movieId === movieData.id && deleteChosenMovie(film._id)
      ));

    }
  }

  // Преобразование времени карточки
  function conversionTime(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours === 0) {
      return `${minutes}м`
    }
    if (minutes === 0) {
      return `${hours}ч`
    }
    return `${hours}ч${minutes}м`
  }

  return (
    <article className="moviesCard">
      <a href={movieData.trailerLink} target="_blank" rel="noreferrer">
        {location
          ? <img className="moviesCard__img" src={`https://api.nomoreparties.co${movieData.image.url}`} alt="Обложка фильма" />
          : <img className="moviesCard__img" src={movieData.image} alt="Обложка фильма" />
        }
      </a>
      <div className="moviesCard__rectangle">
        <div className="moviesCard__container-text">
          <h2 className="moviesCard__title">{movieData.nameRU}</h2>
          <p className="moviesCard__time">{conversionTime(movieData.duration)}</p>
        </div>
        {location ?
          <button
            className={`moviesCard__choice ${choiceMovie && "moviesCard__choice_active"}`}
            type="button"
            onClick={handleChoice}
          />
          :
          <button className="moviesCard__remove" type="button" onClick={()=> deleteChosenMovie(movieData._id)}>
            <img className="moviesCard__cross-img" src={crossImg} alt="Крестик удаления карточки" />
          </button>
        }

      </div>
    </article>
  )
}

export default MoviesCard;
