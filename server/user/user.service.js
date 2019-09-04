const authHelper = require('../helpers/authHelper');
const rollbar = require('../helpers/rollbar');
const userMail = require('./user.mail');
const User = require('./user.model');

exports.saveUser = (newUser, req, res, next) => {
  newUser.save((err, user) => {
    if (err) {
      if ((typeof err === 'object' && err.code === 11000) || err.code === 11001) {
        err.message = `${req.body.email} already use`;
      }

      next(err);

      rollbar.log('saveUser Error', err);

      return;
    }

    res.json({
      ok: true,
      valid: true,
      user,
      token: authHelper.buildToken(user)
    });
  });
};

exports.resetPassword = (email, callback = () => {}) => {
  if (!email) {
    return callback('Email inválido');
  }

  const handleUserPassword = (user) => {
    if (!user) {
      return callback('Usuário não encontrado');
    }

    const password = authHelper.generatePassword();

    user
      .update({ password })
      .then((r) => {
        userMail.sendResetPassword(user, password);
        callback(null, r);
      })
      .catch(e => callback(e));
  };

  User.getUser({
    email
  })
    .then(handleUserPassword)
    .catch(e => callback(e));
};

exports.forgotPassword = (email, callback = () => {}) => {
  if (!email) {
    return callback('Email not defined');
  }

  const handleUserPassCode = (user) => {
    if (!user) {
      return callback('User not found');
    }

    const passCode = authHelper.generatePassCode();

    user
      .update({ passCode })
      .then((r) => {
        // send email
        userMail.sendForgotPassword(user, passCode);
        callback(null, r);
      })
      .catch(e => callback(e));
  };

  User.getUser({
    email
  })
    .then(handleUserPassCode)
    .catch(e => callback(e));
};

exports.updateForgetedPassword = (body, callback = () => {}) => {
  const {
    passCode, password, passwordVerify, email
  } = body;

  if (!email) {
    return callback('Email not defined');
  }

  if (!passCode) {
    return callback('PassCode not defined');
  }

  if (password !== passwordVerify) {
    return callback('"password" and "passwordVerify" not equal');
  }

  const handleUserPassCode = (user) => {
    if (!user) {
      return callback('Email not found');
    }

    const updateData = {
      password,
      passCode: ''
    };

    user
      .update(updateData)
      .then((r) => {
        callback(null, r);
      })
      .catch(e => callback(e));
  };

  User.getUserByEmail({
    email,
    passCode
  })
    .then(handleUserPassCode)
    .catch(e => callback(e));
};
