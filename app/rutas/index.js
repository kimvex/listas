'use strict';

/*
  Este archivo es el encargado de servir las
  rutas del API
*/

const Route = require('express').Router();

const { Listas, Items } = require('../models/db/schema');

// Agregamos los id de nuevos Items a documento de la lista correspondiente
function addItemToList(res, listId, itemId) {
  Listas.update({ _id: listId }, { $push: { items: itemId } })
    .populate('Items')
    .then((item) => {
      res.json({ item });
    })
    .catch(error => res.json({ error }));
}

// Ruta para obtener las listas
Route.get('/listas', (sol, res) => {
  Listas.find({})
    .populate('items')
    .then((data) => {
      res.json({ listas: data });
    })
    .catch(error => res.json({ error }));
});

// Ruta para obtener una lista por id
Route.get('/lista/:id', (sol, res) => {
  const id = sol.body.id;

  Listas.findById({ _id: id })
    .populate('items')
    .then((list) => {
      if (list) {
        return res.json({ list });
      }
      return res.json({ list: 'La lista no existe' });
    })
    .catch(error => res.json({ error }));
});

// Ruta para crear una nueva lista
Route.post('/newList', (sol, res) => {
  const {
    name,
    description,
  } = sol.body;

  Listas.create({
    name,
    description,
  })
    .then(lists => res.json({ listas: lists }))
    .catch(error => res.json({ error }));
});

// Ruta para actualizar una lista
Route.put('/updateList', (sol, res) => {
  const {
    id,
    list,
  } = sol.body;

  Listas.findOneAndUpdate({ _id: id }, list, { new: true })
    .then((listUpdate) => {
      if (listUpdate) {
        return res.json({ listUpdate });
      }

      return res.json({ listUpdate: 'La lista no existe' });
    })
    .catch(error => res.json({ error }));
});

// Ruta para eliminar una lista
Route.delete('/deleteList', (sol, res) => {
  const { id } = sol.body;

  Listas.findOneAndRemove({ _id: id })
    .then((data) => {
      if (data) {
        return res.json({ data });
      }
      return res.json({ data: 'La lista no existe' });
    })
    .catch(error => res.json({ error }));
});

// Ruta para obtener los items de una lista
Route.get('/items/:id', (sol, res) => {
  const id = sol.params.id;

  Listas.findOne({ _id: id }).lean().populate('items').then((lista) => {
    if (lista) {
      return res.json({ items: lista.items });
    }

    return res.json({ items: 'La lista no existe' });
  })
    .catch(error => res.json({ error }));
});

// Ruta para obtener un item por id
Route.get('/item/:id', (sol, res) => {
  const id = sol.params.id;

  Items.findById({ _id: id })
    .then((item) => {
      if (item) {
        return res.json({ item });
      }

      return res.json({ item: 'El item no existe' });
    })
    .catch(error => res.json({ error }));
});

// Ruta para crear un nuevo item
Route.post('/newItems', (sol, res) => {
  const {
    id,
    item,
  } = sol.body;

  Listas.findById({ _id: id })
    .then((lista) => {
      if (lista) {
        return Items.create(item)
          .then(newItem => addItemToList(res, id, newItem._id))
          .catch((error) => {
            res.json({ error });
          });
      }
      return res.json({ item: 'La lista no existe' });
    });
});

// Ruta para actualizar un item
Route.put('/updateItem', (sol, res) => {
  const {
    id,
    item,
  } = sol.body;

  Items.findByIdAndUpdate({ _id: id }, item, { new: true })
    .then((updateItem) => {
      if (updateItem) {
        return res.json({ updateItem });
      }
      return res.json({ updateItem: 'El item no existe' });
    })
    .catch(error => res.json({ error }));
});

// Ruta para eliminar un item
Route.delete('/deleteItem', (sol, res) => {
  const id = sol.body.id;

  Items.findByIdAndRemove({ _id: id })
    .then((data) => {
      if (data) {
        return res.json({ data });
      }
      return res.json({ data: 'El item no existe' });
    })
    .catch(error => res.json({ error }));
});

module.exports = Route;
