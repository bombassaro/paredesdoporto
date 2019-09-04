const mongoose = require('mongoose');
const _ = require('lodash');

class Controller {

  constructor(namespace, model) {
    this.namespace = namespace;
    this.model = model;
  }

  attachGetRequestParams(req) {
    if(req.method !== 'GET') {
      return;
    }

    req.body = {
      ...req.body,
      ...req.query
    }
  }

  load(req, res, next, id) {
    this.model.get(id)
      .then((data) => {
        req[this.namespace] = data; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch(e => next(e));
  }

  get(req, res) {
    return res.json(req[this.namespace]);
  }

  create(req, res, next) {
    let body = _.get(req, 'body', {});
    const userId = _.get(req, 'user._id', null);

    if (this.attachCreator && userId) {
      body = {
        ...body,
        createdBy: mongoose.Types.ObjectId(userId)
      }
    }

    this.model.create(body, (err, object) => {
      if (err) {
        next(err);
      } else {
        res.json({
          ...object,
          ok: true
        });
      }
    });
  }

  update(req, res, next) {
    let body = _.get(req, 'body', {});
    const userId = _.get(req, 'user._id', null);

    if (body._id) {
      delete body._id;
    }

    if (this.attachCreator && userId) {
      body = {
        ...body,
        modifiedBy: mongoose.Types.ObjectId(userId)
      }
    }

    let model = req[this.namespace];

    if (!model) {
      return next('Model not found');
    }

    // TODO resolver isso
    if (Array.isArray(model) && model.length === 1) {
      model = model[0];
    }

    return model.update({ ...body })
      .then(r => res.json(r))
      .catch(e => next(e));
  }

  list(req, res, next) {
    const { filters, sorters } = req.query;
    this.model.list(sorters)
      .then(list => res.json({ index: filters, items: list }))
      .catch(e => next(e));
  }

  listActives(req, res, next) {
    const { filters, sorters } = req.query;
    this.model.listActives(sorters)
      .then(list => res.json({ index: filters, items: list }))
      .catch(e => next(e));
  }

  listFilter(req, res, next) {
    // TODO - possibilitar select dinâmico

    this.attachGetRequestParams(req);
    const { filters, sorters = {} } = req.body;
    let options = {
      offset: sorters.skip || 0,
      limit: sorters.limit || 100,
      sort: sorters.sort || '-createdAt'
    };
    this.model.paginate(filters, options)
      .then(r => {
        let result = {
          index: {
            total: r.total,
            limit: r.limit,
            skip: r.offset
          },
          items: r.docs
        };
        res.json(result);
      })
      .catch(e => next(e));
  }

  remove(req, res, next) {
    let model = req[this.namespace];
    if (!model) {
      return next('Model not found');
    }

    // TODO resolver isso
    if (Array.isArray(model) && model.length === 1) {
      model = model[0];
    }

    return model.remove()
      .then(deleted => res.json(deleted))
      .catch(e => next(e));
  }

}

module.exports = Controller;
