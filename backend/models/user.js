const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле имени должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля name - 2'],
      maxlength: [30, 'Максимальная длина поля name - 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле email должно быть заполнено'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле пароля должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
