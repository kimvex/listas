'use strict';

/**
 * Archivo encargado de hacer los request en la API
 */

import axios from 'axios';

module.exports = {
  loadLists() {
    return axios('/api/listas')
      .then(data => data.data.listas)
      .catch((error) => {
        return console.log(error);
      });
  },
  newList(list) {
    return axios({
      method: 'POST',
      url: '/api/newList',
      data: list,
    })
      .then(data => data.data)
      .catch((error) => {
        return console.log(error);
      });
  },
  updateList(id, list) {
    return axios({
      method: 'PUT',
      url: '/api/updateList',
      data: {
        id,
        list,
      },
    })
      .then(data => data.data)
      .catch((error) => {
        return console.log(error);
      });
  },
  deleteList(id) {
    return axios({
      method: 'DELETE',
      url: '/api/deleteList',
      data: {
        id,
      },
    })
      .then(data => data.data)
      .catch((error) => {
        return console.log(error);
      });
  },
  loadItems(idList) {
    return axios(`/api/items/${idList}`)
      .then(data => data.data)
      .catch((error) => {
        return console.log(error);
      });
  },
  loadItem(idItem) {
    return axios(`/api/item/${idItem}`)
      .then(data => data.data.item)
      .catch((error) => {
        return console.log(error);
      });
  },
  createItem(idList, item) {
    console.log(idList, item);
    return axios({
      method: 'POST',
      url: '/api/newItems',
      data: {
        id: idList,
        item,
      },
    })
      .then(data => data.data.item)
      .catch((error) => {
        return console.log(error);
      });
  },
  updateItem(idItem, item, idList) {
    return axios({
      method: 'PUT',
      url: '/api/updateItem',
      data: {
        id: idItem,
        item,
        idList,
      },
    })
      .then(data => data.data.updateItem)
      .catch((error) => {
        return console.log(error);
      });
  },
  deleteItem(id) {
    return axios({
      method: 'DELETE',
      url: '/api/deleteItem',
      data: {
        id,
      },
    })
      .then(data => data.data)
      .catch((error) => {
        return console.log(error);
      });
  },
  getTextMarkDown() {
    return axios('/js/utils/text.txt')
      .then(data => data.data)
      .catch((error) => {
        return console.log(error);
      });
  },
};
