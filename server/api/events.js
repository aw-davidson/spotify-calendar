const router = require('express').Router();
const {Event} = require('../db/models');
const HttpError = require('../utils/HttpError');
module.exports = router;

router.get('/', (req, res, next) => {
  Event.findAll()
    .then(events => res.json(events))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  Event.findById(id)
    .then(event => {
      if (!event) throw HttpError(404);
      req.requestedEvent = event;
      next();
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  req.requestedEvent.update(req.body)
    .then(event => res.status(200).json(event))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.requestedEvent.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});
