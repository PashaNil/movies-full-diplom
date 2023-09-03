const router = require('express').Router();
const userRoutes = require('./user');
const moviesRoutes = require('./movies');
const authRoutes = require('./auth');
const authMiddlewares = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError'); // 404

router.use('', authRoutes);
router.use('/users', authMiddlewares, userRoutes);
router.use('/movies', authMiddlewares, moviesRoutes);
router.use('/*', (req, res, next) => next(new NotFoundError('Несуществующая страница')));

module.exports = router;
