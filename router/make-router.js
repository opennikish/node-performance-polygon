module.exports = makeRouter;

const { RouterError } = require('./route-error');

function makeRouter(routes) {
  return (req, res) => {    
    const handler = routes[req.url];

    if (! handler) {
      throw new RouterError('Route not found');
    }
      
    handler(req, res);
  }
}
