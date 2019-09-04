const _ = require('lodash');

const CollectionModel = require('../collection/collection.model');
const PostModel = require('./post.model');

const postByCollection = (req, res) => {

	const result = {
		status: false,
		posts: [],
		tags: [],
	};

	return getPostsByCollections()
		.then(handleResult)
		.catch(handleError);

	function getPostsByCollections() {
		let { filters, sorters } = req.body;
	  return new Promise((resolve, reject) => {
	    return PostModel.find(filters, null, sorters).then((response) => {
	      if(!response) {
          return reject("No posts found")
        } else {
	      	result.posts = response
        	_.forEach(response, function(post) {
        		let tags = post.tags
        		_.forEach(tags, function(tag) {
              tag = tag.toUpperCase()
        			let idx = _.findIndex(result.tags, { name: tag })
        			if(idx != -1) {
	        			let item = result.tags[idx]
	        			item.count = item.count + 1
	        			result.tags.splice(idx, 1, item)
        			} else {
        				result.tags.push({ name: tag, count: 1 })
        			}
        		})
        	})
	      	result.status = true
          return resolve()
        }
	    })
	  })
	}

	function handleResult() {
		return res.status(200).json(result);
	}
	function handleError() {
		return res.status(500).json(result);
	}
};

module.exports = postByCollection;