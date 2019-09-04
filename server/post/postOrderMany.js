const _ = require('lodash');
const PostModel = require('./post.model');
const method = (req, res) => {
  let { content } = req.body;
  const filtered = _.filter(content, { tags: ["PDPORTO"]})
	return res.status(200).json(filtered);
};
module.exports = method;

// 5d5c65bc0a17d910d0908625