const express = require('express');
const authRoutes = require('./server/auth/auth.route');
const cRoutes = require('./server/collection/collection.route');
const userRoutes = require('./server/user/user.route');
const rootRoutes = require('./server/root/root.route');
const postRoutes = require('./server/post/post.route');
const systemRoutes = require('./server/system/system.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount auth routes at /auth
router.use('/auth', authRoutes);
// mount user routes at /users
router.use('/collection', cRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);
router.use('/root', rootRoutes);
router.use('/system', systemRoutes);

module.exports = router;