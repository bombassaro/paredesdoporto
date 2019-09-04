const Post = require('./post.model');
const BaseController = require('../base/controller');

class PostController extends BaseController {
  constructor() {
    super('post', Post);
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
module.exports = PostController;