const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      firstname: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      firstname: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      firstname: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
