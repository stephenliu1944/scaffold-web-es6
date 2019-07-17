// server.js
var jsonServer = require('json-server');
var db = require('./data/db.json');
var routes = require('./routes.json');
var pkg = require('../package.json');
var { mock } = pkg.devEnvironments.servers;

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
    res.jsonp(res.locals.data);
};

// Add this before server.use(router)
server.use(jsonServer.rewriter(routes));
  
// Use default router
server.use(router);
server.listen(mock, () => {
    console.log('Mock Server is running');
});