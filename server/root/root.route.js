const express = require('express');
const collectionsFromRoot = require('./collectionsFromRoot');
const router = express.Router();
router.route('/').post(collectionsFromRoot);
module.exports = router;