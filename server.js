const http = require('http');

const port = 7777;
const hostname = '127.0.0.1';

const server = http.createServer(handler);

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const config = {
  leakSize: 1000000,
  dumpLoopSize: 1000,
};

const route = makeRouter({
  '/leak': leakHandler(config.leakSize),
  '/block': blockMainThreadHandler(config.dumpLoopSize),
  '/': homeHandler()
});

function handler(req, res) {  
  res.setHeader('Content-Type', 'text/plain');    
  let statusCode = 200;

  try {
    route(req, res);    
  } catch (error) {
    onError(error, 'Something went wrong.');
    statusCode = 500;
  } finally {
    res.statusCode = statusCode;
    res.end(null);  
  }
}

function onError(error, defaultMessage) {
  return (req, res) => {
    const userErrorMessage = defaultMessage;
    console.log(e.message || userErrorMessage);

    res.write(defaultMessage);    
  };
}

class RouterError extends Error {};

function makeRouter(routes) {
  return (req, res) => {    
    const handler = routes[req.url];

    if (! handler) {
      throw new RouterError('Route not found');
    }
      
    handler(req, res);
  }
}

// Home handler stub.
function homeHandler() {
  return (req, res) => {
    res.write('Hello from home handler');    
  };  
}

// Increase memory leak.
function leakHandler(n) {
  const leak = [];

  return (req, res) => {    
    leak.push(new Array(n).join('bigass'));

    res.write('Hello from leak handler');  
  };  
}

// Block main thread.
function blockMainThreadHandler(n) {
  return (req, res) => {    
    new Array(n).join('_').split('').forEach(x => console.log(x));
    res.write('Hello from blocking main thread handler');
  }
}
