const request = require('request');
const _ = require('lodash');
const config = require('../../config/config');
const User = require('../user/user.model');

function ManagerService() {
  const {
    host,
    token
  } = config.manager;

  const getPetProp = (dogs, prop) => {
    return _.map(dogs, prop).join(', ') || '';
  };

  const mountManagerModel = async (ownerId) => {
    let user = await User.get(ownerId);

    user = user.toObject({getters: true});

    return {
      'legal_entity': 'F',
      'email': user.email || '',
      'name': user.firstname || '',
    };
  };

  this.sendData = async (ownerId) => {
    const data = await mountManagerModel(ownerId);
    const url = `${host}/records/${token}`;
    // const url = 'https://webhook.site/ee2d6ca8-1125-44dd-9ace-58d4fe2067c6';
    request.post({url, formData: data}, (err, httpResponse, body) => {
      console.log(err, httpResponse, body);
    });
  };

}

module.exports = new ManagerService();
