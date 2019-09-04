const Model = require('./collection.model');
const BaseController = require('../base/controller');

class Controller extends BaseController {
  constructor() {
    super('collection', Model);
    this.attachCreator = true;
  }  
  listFilter(req, res, next) {
    req.body.sorters = {
      ...req.body.sorters,
      sort: 'name'
    }; 
    return super.listFilter(req, res, next)
  }
}
module.exports = Controller;