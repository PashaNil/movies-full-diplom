const { mongoose } = require('mongoose');
const MovieModel = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError'); // 400
const ForbiddenError = require('../errors/ForbiddenError'); // 403
const NotFoundError = require('../errors/NotFoundError'); // 404

// Получение всех фильмов
const getMovie = (req, res, next) => {
  const { id } = req.user;
  return MovieModel.find({ owner: id })
    .then((movie) => (
      res.status(200).send(movie)
    ))
    .catch((err) => next(err));
};

// Создание фильма
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const { id } = req.user;

  return MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: id,
  })
    .then((movie) => (
      res.status(201).send(movie)
    ))
    .catch((err) => {
      console.log(err);
      if (err instanceof mongoose.Error.ValidatorError) {
        return next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      }
      return next(err);
    });
};

// Удаление фильма
const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const { id } = req.user;
  return MovieModel.findById(movieId).orFail()
    .then((movie) => {
      if (movie.owner.valueOf() !== id) throw new ForbiddenError('Вы не владелец этого фильма');
      return movie.deleteOne().then(() => res.send(movie));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) return next(new NotFoundError('Фильм с указанным id не найдена'));
      if (err instanceof mongoose.Error.CastError) return next(new BadRequestError('Передан некорректный id'));
      return next(err);
    });
};

module.exports = {
  getMovie, createMovie, deleteMovieById,
};
