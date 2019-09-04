const _ = require('lodash');
const PostModel = require('./post.model');
const postInsertMany = (req, res) => {
	let result = { status: false };
  let { content } = req.body;
  PostModel.insertMany(content, (err, response) => {
    // console.log(response, err);
    if(!response) {
      result.status = false;
    	return res.status(500).json(result);
    } else {
      result = response;
    	return res.status(200).json(result);
    }
  });
};
module.exports = postInsertMany;