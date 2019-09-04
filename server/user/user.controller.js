const User = require('./user.model');
const BaseController = require('../base/controller');
const authHelper = require('../helpers/authHelper');
const userService = require('./user.service');
const mailer = require('../helpers/mailer');

class UserController extends BaseController {

  constructor() {
    super('userId', User);
  }

  create(req, res, next) {
    const newUser = new User({
      ...req.body,
      isAdmin: false,
      isActive: true
    });

    return userService.saveUser(newUser, req, res, next);
  }

  updateForgetedPassword(req, res, next) {
     userService.updateForgetedPassword(req.body, (err, user) => {
      if(err){
        return next(err);
      }

      res.json({
        ok: true
      });
    });
  }

  forgotPassword(req, res, next) {
     userService.forgotPassword(req.body.email, (err, user) => {
      if(err){
        return next(err);
      }

      res.json({
        ok: true
      });
    });
  }

  resetPassword(req, res, next){    
    userService.resetPassword(req.body.email, (err, user) => {
      if(err){
        return next(err);
      }

      res.json({
        ok: true
      });
    });
  }

  testMail(req, res, next) {
    const params = {
      to: 'topogigiovanni@gmail.com,fernando.bombassaro@gmail.com',
      subject: 'Braza teste',
      body: 'É os guri!'
    };

    mailer.sendMail(params, () => {
      res.json({ok:true});
    });
  }

  pushNotificationToken(req, res, next) {
    const {user, body} = req;
    const {token} = body;

    if(!user){
      return next('User not found');
    }

    User.findOneAndUpdate(
      {_id: user._id},
      {pushToken: token},
      (err, $user) => {
        if(err || !$user){
          return next('User not found');
        }

        req.json({
          ok: true
        });
      }
    );
  }
}

module.exports = UserController;
