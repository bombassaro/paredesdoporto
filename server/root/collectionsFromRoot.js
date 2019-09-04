const _ = require('lodash');
const CollectionModel = require('../collection/collection.model');
const collectionsFromRoot = (req, res) => {
	let result = {
		status: false,
    menu: [],
    subs: []
	};

	return getRoot()
		.then(getCollections)
    .then(handleResult)
		.catch(handleError);

	function getRoot() {
    const { filters } = req.body
    let filter = {}
	  return new Promise((resolve, reject) => {
	    return CollectionModel.find(filter).then((response) => {
	      if(!response) {
          return reject("No collection to load")
        } else {
        	result.menu = response
          result.status = true
          const maindata = _.find(response, {"path": filters.main})
          if(maindata) {
            result.subs.push(maindata._id.toString())
          } 
        	return resolve()
        }
	    })
	  })
  }
	function getCollections() {
		let filter = {"parent": {"$in": result.subs}}
	  return new Promise((resolve, reject) => {
	    return CollectionModel.find(filter).then((response) => {
	      if(!response) {
          return reject("No subcollections to load")
        } else {
      		let stop = false
        	_.forEach(response, function(it) {
        		let id = it._id.toString()
        		if(!_.includes(result.subs, id)) {
	    				result.subs.push(id)
	    				stop = true
        		} else {
        		}
        	})
	    		if(stop === true) {
	  				return resolve(getCollections())
	    		}
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

module.exports = collectionsFromRoot;