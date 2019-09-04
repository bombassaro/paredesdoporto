const OneSignal = require('onesignal-node');
const _ = require('lodash');
const config = require('../../config/config');

const providers = {
  onesignal: 'onesignal'
};

class NotificationService {
  constructor() {
    switch (config.notification.provider) {
      case providers.onesignal:
        return new OneSignalService();
      default:
        throw new Error('Provider de notificação não definido');
        return {};
    }
  }
}

// Privadas
class OneSignalService {
  constructor() {
    this.client = new OneSignal.Client({
      //userAuthKey: 'XXXXXX',
      // note that "app" must have "appAuthKey" and "appId" keys
      app: {
        appAuthKey: config.notification.onesignal.appAuthKey,
        appId: config.notification.onesignal.appId
      }
    });
  }

  sendUserPushNotification(message, usersId, cb, extraParams = {}) {
    const {client} = this;

    if(!_.isArray(usersId)) {
      usersId = [usersId];
    }

    // we need to create a notification to send
    const firstNotification = new OneSignal.Notification({
      contents: {
        en: message,
        pt: message
      },
      isEmail: false
    });

    firstNotification.postBody['filters'] = [];

    const usersLength = usersId.length - 1;

    _.each(usersId, (uid, i) => {

      firstNotification.postBody['filters'].push({
        field: 'tag',
        key: 'id',
        relation: '=',
        value: uid
      });

      if(i < usersLength) {
        firstNotification.postBody['filters'].push({operator: 'OR'});
      }
    });

    firstNotification.postBody = {
      ...firstNotification.postBody,
      ...extraParams
    }

    // console.log('firstNotification', firstNotification.postBody);

    // firstNotification.postBody['filters'] = [{'field': 'tag', 'key': 'email', 'relation': '=', 'value': 'topogigiovanni@gmail.com'}];     // firstNotification.postBody["excluded_segments"] = ["Banned Users"];
    // firstNotification.postBody['include_external_user_ids'] = ['5c70646ce0efe3636f9f8656'];

    // // set notification parameters
    // firstNotification.postBody["data"] = {
    //   "abc": "123",
    //   "foo": "bar"
    // };
    // firstNotification.postBody["send_after"] = 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)';

    // send this notification to All Users except Inactive ones
    client.sendNotification(firstNotification, (err, httpResponse, data) => {
      cb(err, data);
    });
  }

  sendEmail(email = {}, cb, extraParams = {}) {
    const {client} = this;

    const emailNotification = new OneSignal.Notification({
      // contents: {
      //   en: email.body,
      //   pt: email.body
      // },
      email_body: email.body,
      email_subject: email.subject,
      isEmail: true,
      isAnyWeb: false,
      isIos: false,
      isAdnoid: false,
    });
    // set target users

    emailNotification.postBody['filters'] = [{
      'field': 'tag',
      'key': 'email',
      'relations': '=',
      'value': email.to
    }];

    emailNotification.postBody = {
      ...emailNotification.postBody,
      ...extraParams
    }

    // console.log('emailNotification', emailNotification.postBody);

    client.sendNotification(emailNotification, (err, httpResponse, data) => {
      cb(err, data);
    });
  }
}

module.exports = new NotificationService();
