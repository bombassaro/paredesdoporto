const path = require('path');
const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  ENABLE_MIGRATION: Joi.boolean()
    .default(false),
  MANAGER_ENABLED: Joi.boolean()
    .default(true),
  MANAGER_TOKEN: Joi.string()
    .default('71'),
  MANAGER_HOST: Joi.string()
    .default('http'),
  NOTIFICATION_PROVIDER: Joi.string()
    .default('onesignal'),
  ONESIGNAL_APP_KEY: Joi.string()
    .default('Mz'),
  ONESIGNAL_APP_ID: Joi.string()
    .default('11'),
  SENDGRID_TOKEN: Joi.string()
    .default('SG')
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  tz: 'America/Sao_Paulo',
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  mailer: {
    key: envVars.SENDGRID_TOKEN,
    email: envVars.MAILER_EMAIL_FROM || '',
    password: envVars.MAILER_EMAIL_PASSWORD || ''
  },
  rollbar: {
    accessToken: envVars.ROLLBAR_ACCESSTOKEN || ''
  },
  manager: {
    enabled: envVars.MANAGER_ENABLED,
    token: envVars.MANAGER_TOKEN,
    host: envVars.MANAGER_HOST
  },
  notification: {
    provider: envVars.NOTIFICATION_PROVIDER,
    onesignal: {
      appAuthKey: envVars.ONESIGNAL_APP_KEY,
      appId: envVars.ONESIGNAL_APP_ID
    }
  },
  enableAPIErrorHandler: true,
  enableCronJob: true,
  enableMigrations: envVars.ENABLE_MIGRATION
};


module.exports = config;
