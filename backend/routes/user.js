const router = require('express').Router();

const { reqRulesUpdateProfile } = require('../utils/requestValidationRules');

const {
  updateProfile, getUserInfo,
} = require('../controllers/user');

// Получить авторизированного пользователя
router.get('/me', getUserInfo);

// Обновление профиля
router.patch('/me', reqRulesUpdateProfile, updateProfile);

module.exports = router;
