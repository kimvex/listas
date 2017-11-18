'use strict';

const test = require('ava');

const Mongodb = require('../app/controllers/mongodb');

test('connection mongo', async (t) => {
  const mongo = new Mongodb();

  t.is(await mongo, 'Connected');
});
