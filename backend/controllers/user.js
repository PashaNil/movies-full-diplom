const bcrypt = require('bcrypt');
const { mongoose } = require('mongoose');

const UserModel = require('../models/user');
const { generateToken } = require('../utils/jwt');

const BadRequestError = require('../errors/BadRequestError'); // 400
const UnauthorizedError = require('../errors/UnauthorizedError'); // 401
const NotFoundError = require('../errors/NotFoundError'); // 404
const ConflictError = require('../errors/ConflictError'); // 409

const SALT_ROUNDS = 10;

// Авторизация с проверкой данных и отдачей токена
const login = (req, res, next) => {
  const { email, password } = req.body;

  // Поиск в бд пользователя с таким email
  return UserModel.findOne({ email }).select('+password').orFail()
    .then((user) => (
      // Получение пароля из хеша
      bcrypt.compare(password, user.password)
        .then((isPasswordMatch) => {
          if (!isPasswordMatch) throw new UnauthorizedError('Неправильный password');
          // Cоздание и отдача токена
          const token = generateToken(user._id);
          return res.status(200).send({ token });
        })
    ))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new UnauthorizedError('Такого пользователя не существует'));
      }
      return next(err);
    });
};

// Получение информции о пользователе
const getUserInfo = (req, res, next) => {
  const { id } = req.user;

  return UserModel.findById(id).orFail()
    .then((user) => (
      res.status(200).send(user)
    ))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      return next(err);
    });
};

// Создание нового пользователя.
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return bcrypt.hash(password, SALT_ROUNDS, (error, hash) => (
    UserModel.create({
      name, email, password: hash,
    })
      .then(() => (
        res.status(201).send({
          name, email,
        })
      ))
      .catch((err) => {
        if (err.code === 11000) return next(new ConflictError('Такой пользователь уже существует'));
        if (err instanceof mongoose.Error.ValidationError) {
          return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
        }
        return next(err);
      })
  ));
};

// Обновление информции профиля
const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  const { id } = req.user;

  return UserModel.findByIdAndUpdate(id, { email, name }, { returnDocument: 'after', runValidators: true }).orFail()
    .then((user) => (
      res.status(200).send(user)
    ))
    .catch((err) => {
      if (err.code === 11000) return next(new ConflictError('Такой пользователь уже существует'));
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь с указанным _id не найден'));
      }
      return next(err);
    });
};

module.exports = {
  createUser, updateProfile, login, getUserInfo,
};
