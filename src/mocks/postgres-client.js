function postgresClientMockInstance(query) {
  return {
    one: query,
    any: query
  }
};

module.exports = class PostgresClientMock {
  constructor(options, { connectionErr, err, response } = {}){
    const query = jest.fn(() =>
      new Promise((resolve, reject) => {
        if (connectionErr)
          reject(err);
        else
          resolve(response);
      })
    );
    return postgresClientMockInstance(query);
  }
}
