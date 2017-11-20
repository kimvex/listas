'use strict';

/*
  Este archivo es el encargado de servir las
  rutas del API
*/

const Route = require('express').Router();

const { Listas, Items } = require('../models/db/schema');

// Agregamos los id de nuevos Items a documento de la lista correspondiente
function addItemToList(res, listId, itemId) {
  Listas.findByIdAndUpdate({ _id: listId }, { $push: { items: itemId } }, { new: true })
    .lean()
    .populate('items')
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
  const id = sol.params.id;

  Listas.findById({ _id: id })
    .populate('items')
    .then((list) => {
      if (list) {
        return res.json({ list });
      }
      return res.json({ list: 'La lista no existe' });
    })
    .catch(error => res.json({ error: 'La lista o id no existen' }));
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
    .then((lists) => {
      Listas.find({})
        .then((listas) => {
          res.json({ lista: lists, listas });
        })
        .catch(error => res.json({ error }));
    })
    .catch(error => res.json({ error }));
});

// Ruta para actualizar una lista
Route.put('/updateList', (sol, res) => {
  const {
    id,
    list,
  } = sol.body;

  Listas.findOneAndUpdate({ _id: id }, list, { new: true })
    .populate('items')
    .then((listUpdate) => {
      if (listUpdate) {
        Listas.find({})
          .populate('items')
          .then((listas) => {
            if (listas) {
              return res.json({ listUpdate, listas });
            }

            return res.json({ listUpdate });
          })
          .catch((error) => {
            return res.json({ error });
          });
      } else {
        return res.json({ listUpdate: 'La lista no existe' });
      }

    })
    .catch(error => res.json({ listUpdate: 'La lista no existe o no es un Id valido' }));
});

// Ruta para eliminar una lista
Route.delete('/deleteList', (sol, res) => {
  const { id } = sol.body;

  Listas.findOneAndRemove({ _id: id })
    .then((data) => {
      if (data) {
        Listas.find({})
          .then(lista => res.json({ data, listas: lista }))
          .catch((error) => {
            return res.json(error);
          });
      } else {
        return res.json({ data: 'La lista no existe' });
      }
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
    .catch(error => res.json({ error: 'La lista o id no existe' }));
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
    idList,
  } = sol.body;
  
  // Buscamos el item por id y lo actualizamos
  Items.findByIdAndUpdate({ _id: id }, item, { new: true })
    .then((updateItem) => {
      // Buscamos que el valor no llegue vacio de lo contrario respondemos que no existe el item a actualizar
      if (updateItem) {
        // Consultamos que llegue un id de lista para reponder todo un array y no solo el item actualizado
        if (idList) {
          Listas.findById({ _id: idList })
            .populate('items')
            .then((lista) => {
              if (lista) {
                return res.json({ updateItem: { item: updateItem, items: lista.items } });
              }
              return res.json({ updateItem: 'La lista a la que quieres agregar el item no existe' });
            })
            .catch((error) => {
              return res.json({ error });
            });
        } else {
          return res.json({ updateItem });
        }
      } else {
        return res.json({ updateItem: 'El item no existe' });
      }
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
