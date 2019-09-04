const express = require('express');
const Controller = require('./system.controller');
const authMiddleware = require('../auth/auth.middleware');

const ctrl = new Controller();
const router = express.Router();

router.use(authMiddleware.isAdministrator);

router.route('/clean-db')
  .get(ctrl.cleanDb.bind(ctrl));

router.route('/install-data')
  .get(ctrl.installData.bind(ctrl));

router.route('/push-notification')
  .post(ctrl.sendPushNotification.bind(ctrl));

router.route('/test-mail')
  .post(ctrl.sendEmail.bind(ctrl));

module.exports = router;
