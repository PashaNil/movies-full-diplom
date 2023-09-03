const { celebrate, Joi } = require('celebrate');
const { regularUrl } = require('./regularExpressions');

// Авторизация
const reqRulesLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(2).max(30).required(),
  }),
});

// Регистрация
const reqRulesCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(2).max(30).required(),
  }),
});

// Обновление профиля
const reqRulesUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

// Создание карточки
const reqRulesCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regularUrl),
    trailerLink: Joi.string().required().pattern(regularUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(regularUrl),
    movieId: Joi.number().required(),
  }),
});

// Удаление карточки
const reqRulesDeleteMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  reqRulesLogin,
  reqRulesCreateUser,
  reqRulesUpdateProfile,
  reqRulesCreateMovie,
  reqRulesDeleteMovieById,
};
