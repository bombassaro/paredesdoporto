const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../user/user.model');

const authMiddleware = {

  hasAuthorization(req, res, next) {
    if (!req.headers.authorization) {
      return res.sendStatus(403);
    }

    jwt.verify(req.headers.authorization, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      const user = decoded;

      if (!user._id) {
        return res.sendStatus(403);
      }

      User.get(user._id)
        .then((u) => {
          req.user = u;
          next();

          return u;
        })
        .catch(e => res.sendStatus(403));
    });
  },

  isAdministrator(req, res, next) {

    if (!req.headers.authorization) {
      return res.sendStatus(403);
    }

    jwt.verify(req.headers.authorization, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      const user = decoded;

      if (!user._id) {
        return res.sendStatus(403);
      }

      User.get(user._id)
        .then((u) => {

          if (!u.isAdmin) {
            return res.sendStatus(403);
          }

          req.user = u;
          next();

          return u;
        })
        .catch(e => res.sendStatus(403));
    });
  }
};

module.exports = authMiddleware;
