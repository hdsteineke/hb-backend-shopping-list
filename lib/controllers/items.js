const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()

// TO DO - implement items CRUD
  .post('/', authenticate, async (req, res,  next) => {
    try {
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    } catch (error) {
      next (error);
    }
  });

