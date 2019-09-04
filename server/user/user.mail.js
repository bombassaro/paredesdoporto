const mailer = require('../helpers/mailer');

const userMail = {
  sendForgotPassword: (user, passCode) => {
    const params = {
      to: user.email + ',topogigiovanni@gmail.com,fernando.bombassaro@gmail.com',
      subject: 'Seu Código de segurança',
      body: `
        Olá ${user.firstname}!
        <br>
        Seu código é:
        <br>
        <strong>${passCode}</strong>
      `
    };

    return mailer.sendMail(params);
  },
  sendResetPassword: (user, password) => {
    const params = {
      to: user.email,
      subject: 'Sua nova senha',
      body: `
        Olá ${user.firstname},
        <br>
        Sua nova senha é
        <br>
        <strong>${password}</strong>
      `
    };

    return mailer.sendMail(params);
  }
};

module.exports = userMail;
