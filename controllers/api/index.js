const router = require('express').Router();
const apiCommentRoutes = require('./apiCommentRoutes');
const apiPostRoutes = require('./apiPostRoutes');
const apiUserRoutes = require('./apiUserRoutes');

router.use('/comments', apiCommentRoutes);
router.use('/posts', apiPostRoutes);
router.use('/users', apiUserRoutes);

module.exports = router;