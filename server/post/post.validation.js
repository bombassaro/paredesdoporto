const Joi = require('joi');
const baseSchema = Joi.object({});
module.exports = {
  create: {
    body: baseSchema
  },
};
