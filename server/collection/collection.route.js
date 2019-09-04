const express = require('express');
const validate = require('express-validation');
const controller = require('./collection.controller');

const ctrl = new controller();
const router = express.Router();

router.route('/')
  .get(ctrl.listFilter.bind(ctrl))
  .post(ctrl.create.bind(ctrl));

router.route('/filter')
  .post(ctrl.listFilter.bind(ctrl));

router.route('/:postId')
  .get(ctrl.get.bind(ctrl))
  .put(ctrl.update.bind(ctrl))
  .delete(ctrl.remove.bind(ctrl));

router.param('postId', ctrl.load.bind(ctrl));

module.exports = router;