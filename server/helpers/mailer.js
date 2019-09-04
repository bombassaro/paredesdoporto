const sgMail = require('@sendgrid/mail');
const config = require('../../config/config');

function Mailer() {

  sgMail.setApiKey(config.mailer.key);


  this.sendMail = (options, callback) => {

    const baseMail = 'lovdog.app@lovdog.com';
    // var baseMail = 'jsel.robot@gmail.com';

    const msg = {
      from: `${baseMail}`, // sender address
      to: options.to || '', // list of receivers
      subject: options.subject || '', // Subject line
      html: options.body || '' // html body
    };

    // return transporter.sendMail(msg, callback);

    // const msg = {
    //   to: 'test@example.com',
    //   from: 'test@example.com',
    //   subject: 'Sending with SendGrid is Fun',
    //   text: 'and easy to do anywhere, even with Node.js',
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };

    sgMail.send(msg);
  };

}

module.exports = new Mailer();
