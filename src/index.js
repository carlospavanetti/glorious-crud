const bodyParser = require('body-parser');
const BaseResource = require('./resources/base/base');
const resourceBuilder = require('./resources/builder/builder');

class GCrud {
  constructor(dbUrl, dbName, app, resourceAsDependency){
    if (!resourceAsDependency)
      this.baseResource = new BaseResource(dbUrl, dbName);
    this.app = app;
    this.app.use(bodyParser.json());
  }

  static fromResource(resource, app){
    const gCrud =  new GCrud(null, null, app, true);
    gCrud.baseResource = resource;
    return gCrud;
  }

  build(collectionName, collectionOptions){
    return resourceBuilder.build(
      this.app,
      this.baseResource,
      collectionName,
      collectionOptions
    );
  }
};

module.exports = GCrud;