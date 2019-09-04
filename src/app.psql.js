const express = require('express');
const GCrud = require('.');
const PostgresResource = require('./resources/postgres');
const env = require('../environments/dev.psql.json');

const app = express();
const gCrud = GCrud.fromResource(new PostgresResource(env.db), app);

const beersResource = gCrud.build('beers', {
  onPostSuccess: (req, res, result) => {
    res.status(201).send({
      message: 'Beer successfully saved!',
      id: result.body._id
    });
  }
});

app.listen(env.app.port, () => {
  console.log(`Running on port ${env.app.port}...`);
});
