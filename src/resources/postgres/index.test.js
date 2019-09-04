const pg = require('pg-promise');
const PostgresResource = require('./');
const PostgresClientMock = require('../../mocks/postgres-client');

describe('Postgres Resource', () => {
  const DB_URL = 'localhost';
  const DB_NAME = 'postgres';
  const postgresResource = new PostgresResource({});;

  function mockUser(){
    return {
      _id: '5ad25c91d44a096d26a280be',
      name: 'Rafael',
      createdAt: '2018-04-07T00:00:00.000Z'
    };
  }

  function stubPostgresClientConnect({ connectionErr, err, response } = {}){
  //   mongodb.MongoClient.connect = jest.fn((url, callback) => {
  //     const mongoDBClientMock = new MongoDBClientMock({ err, response });
  //     return connectionErr ? callback(connectionErr) : callback(null, mongoDBClientMock);
  //   });
    postgresResource.connection = new PostgresClientMock({}, { connectionErr, err, response });
  }

  beforeEach(() => {
  //   mongodb.ObjectID = jest.fn(id => id);
  //   dateService.getNow = jest.fn(() => new Date('2018-04-07'));
  //   queryService.build = jest.fn(() => { return {}; });
  });

  it('should return a promise after connecting to the postgres client', () => {
    stubPostgresClientConnect({ response: mockUser() });
    const promise = postgresResource.get('users');
    expect(promise.then).toBeDefined();
  });

  it('should get all resources of a collection', () => {
    const users = [{first: 'user'}, {second: 'user'}];
    stubPostgresClientConnect({ response: users });
    postgresResource.get('users').then(response => {
      expect(response).toEqual(users);
    });
  });

  it('should get a single resource of a collection', () => {
    const _id = '5ad25c91d44a096d26a280be';
    stubPostgresClientConnect({ response: mockUser() });
    postgresResource.get('users', _id).then(response => {
      expect(response).toEqual(mockUser());
    });
  });

  it('should throw resource not found error when trying to get a non existing resource', () => {
    stubPostgresClientConnect();
    postgresResource.get('users', '5ad25c91d44a096d26a280be').then(() => {}, err => {
      expect(err).toEqual({status: 404});
    });
  });
});