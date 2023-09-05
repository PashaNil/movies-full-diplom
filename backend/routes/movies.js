const router = require('express').Router();

const {
  reqRulesCreateMovie,
  reqRulesDeleteMovieById,
} = require('../utils/requestValidationRules');

const {
  getMovie,
  createMovie,
  deleteMovieById,
} = require('../controllers/movie');

// Получение всех карточек
router.get('', getMovie);

// Создание карточки
router.post('', reqRulesCreateMovie, createMovie);

// Удаление карточки по id
router.delete('/:movieId', reqRulesDeleteMovieById, deleteMovieById);

module.exports = router;
