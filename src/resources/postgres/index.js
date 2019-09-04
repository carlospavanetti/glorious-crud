const pg = require('pg-promise')();

module.exports = class PostgresResource {
  constructor({ user, host, port, database, password }){
    this.connection = pg({ user, host, port, database, password });
  }

  get(collection, id, query = {}){
    return id ? singleResource(
      this.connection,
      collection, id
    ): this.connection.any(
      'select * from $1:name',
      [collection]
    );
  }
}

function singleResource(connection, collection, id) {
  return connection.one(
    'select * from $1:name where id=$2',
    [collection, id]
  ).then(result => {
    if (!result)
      throw {status: 404};
    return result;
  });
}