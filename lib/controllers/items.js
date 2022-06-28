const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorizeItem = require('../middleware/authorizeItem');
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
  })
  
  
  .get('/', authenticate, async (req, res, next) => {
    try {
      const listOfItems = await Item.getAll(req.user.id);
      res.json(listOfItems);
    } catch (error) {
      next (error);
    }
  })
  
  .put('/:id', authenticate, authorizeItem, async (req, res, next) => {
    try {
      const updatedItem = await Item.updateById(req.params.id, req.body);
      res.json(updatedItem);
    } catch (error) {
      next (error);
    }
  })
  
  .delete('/:id', authenticate, authorizeItem, async (req, res, next) => {
    try {
      const deletedItem = await Item.delete(req.params.id);
      res.json(deletedItem);
    } catch (error) {
      next (error);
    }
  });

