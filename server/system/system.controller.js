const mongoose = require('mongoose');
const {
  exec
} = require('child_process');
const config = require('../../config/config');
const mailer = require('../helpers/mailer');
const notificationService = require('../helpers/notificationService');

const mongoUri = config.mongo.host;

class SystemController {
  cleanDb(req, res, next) {

    const onConnect = (err) => {
      if (err) {
        console.error(err.stack);
      } else {

        mongoose.connection.db.dropDatabase();
      }
    };

    mongoose.connect(
      mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true
      },
      onConnect
    );

    return res.json({
      ok: true
    });
  }

  installData(req, res, next) {
    exec('node install.js', (err, stdout, stderr) => {
      if (err) {
        next(err);
        return;
      }

      req.json({
        stdout,
        stderr
      });
    });
  }

  sendPushNotification(req, res, next) {
    notificationService.sendUserPushNotification('Olá user', '5c70646ce0efe3636f9f8656', (err, data) => {
      res.json({ok:true, err, data});
    });
  }

  sendEmail(req, res, next) {
    const email = {
      to: req.body.email,
      subject: req.body.subject || 'email teste',
      body: `
        Olá ${req.body.email},

        <strong>Exemplo de texto</strong>
        <br>
        <small>Sub texto</small>
      `
    };

    // notificationService.sendEmail(email, (err, data) => {
    //   res.json({ok:true, err, data});
    // });

    mailer.sendMail(email);

    res.json({ok:true});
  }
}

module.exports = SystemController;
