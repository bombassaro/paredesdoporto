const express = require('express');
const validate = require('express-validation');
const controller = require('./post.controller');
const postByCollection = require('./postByCollection');
const postInsertMany = require('./postInsertMany');
const postOrderMany = require('./postOrderMany');

const ctrl = new controller();
const router = express.Router();

router.route('/')
  .get(ctrl.listFilter.bind(ctrl))
  .post(ctrl.create.bind(ctrl));

router.route('/filter')
  .post(postByCollection);

router.route('/many')
  .post(postInsertMany);

router.route('/order')
  .post(postOrderMany);
  
router.route('/:postId')
  .get(ctrl.get.bind(ctrl))
  .put(ctrl.update.bind(ctrl))
  .delete(ctrl.remove.bind(ctrl));

router.param('postId', ctrl.load.bind(ctrl));

module.exports = router;